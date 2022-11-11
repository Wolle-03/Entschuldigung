import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import axios from 'axios'
import SHA1 from "crypto-js/sha1"
import JSEncrypt from 'jsencrypt'
import { Component } from 'react'
import { connect } from 'react-redux'
import { RootState } from '../store'
import Entry from './Entry'
import { homeStateType, reducers } from './HomeSlice'

type Props = homeStateType & typeof reducers & {
	rsa_private_key: string,
	fontSize: number,
	archive: boolean
}

type State = {
	token: string | null
}

export class Home extends Component<Props, State> {

	constructor(props: Props | Readonly<Props>) {
		super(props);
	}

	state = {
		token: null
	}

	delete = async (id: number) => {
		let sign = new JSEncrypt();
		sign.setPrivateKey(this.props.rsa_private_key)
		let signature = sign.sign(this.state.token!, (str: string) => SHA1(str).toString(), "sha1")
		let data = axios.post("https://test.mcs-rbg.de/processEntry.php", {
			token: this.state.token, signature, id
		})
			.then(response => response.data)
			.catch((error) => { console.log(error); return null; });
		if ("error" in (await data)!) {
			let token = axios.get("https://test.mcs-rbg.de/getToken.php")
				.then(response => String(response.data.token))
				.catch((error) => { console.log(error); return ""; })
			signature = sign.sign((await token)!, (str: string) => SHA1(str).toString(), "sha1")
			data = axios.post("https://test.mcs-rbg.de/processEntry.php", {
				token: await token, signature, id
			})
				.then(response => response.data)
				.catch((error) => { console.log(error); return null; });
		}
		this.setState({ token: (await data).token });
		this.getEntries()
	}

	getEntries = async () => {
		let sign = new JSEncrypt();
		sign.setPrivateKey(this.props.rsa_private_key)
		let signature = sign.sign(this.state.token!, (str: string) => SHA1(str).toString(), "sha1")
		let data = axios.post("https://test.mcs-rbg.de/getEntries.php", {
			token: this.state.token, signature, getFinished: this.props.archive
		})
			.then(response => response.data)
			.catch((error) => { console.log(error); return null; });
		if (!("entries" in (await data))) {
			let token = axios.get("https://test.mcs-rbg.de/getToken.php")
				.then(response => String(response.data.token))
				.catch((error) => { console.log(error); return ""; })
			signature = sign.sign((await token)!, (str: string) => SHA1(str).toString(), "sha1")
			data = axios.post("https://test.mcs-rbg.de/getEntries.php", {
				token: await token, signature, getFinished: this.props.archive
			})
				.then(response => response.data)
				.catch((error) => { console.log(error); return null; });
		}
		console.log((await data).entries)
		this.setState({ token: (await data).token });
		this.props.setEntries((await data).entries);
	}

	render() {
		if (this.props.entries === null)
			this.getEntries();
		return (
			<TableContainer component={Paper}>
				{(this.props.entries !== null && this.props.entries.length > 0) ?
					<Table sx={{ minWidth: 650 }}>
						<TableHead>
							<TableRow>
								<TableCell>Name</TableCell>
								<TableCell>Klasse</TableCell>
								<TableCell>Attestpflicht</TableCell>
								<TableCell>Zeit</TableCell>
								<TableCell>Grund</TableCell>
								<TableCell>Kommentar</TableCell>
								<TableCell>Bearbeitet</TableCell>
							</TableRow>
						</TableHead>

						{this.props.entries.map(entry =>
							<TableBody>
								<Entry key={entry.id}{...entry} delete={this.delete} showDelete={!this.props.archive} />
							</TableBody>
						)}
					</Table> :
					<Typography margin={5} align='center' variant='h4'>Es gibt zurzeit keine Enträge</Typography>
				}
			</TableContainer >
		)
	}
}

const mapStateToProps = (state: RootState) => ({
	...state.home,
	rsa_private_key: state.app.rsa_private_key!,
	fontSize: state.app.fontSize,
	archive: state.app.archive
})

const mapDispatchToProps = { ...reducers }

export default connect(mapStateToProps, mapDispatchToProps)(Home)