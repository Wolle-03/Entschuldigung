import { Typography } from "@mui/material";
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useSearchParams } from "react-router-dom";
import { RootState } from '../store';

type Props = {
	schueler: string,
	signature: string,
	debug: string
}

export class Success extends Component<Props> {

	render() {
		return (
			<React.Fragment>
				<Typography variant="h5" gutterBottom>
					Deine Entschuldigung war erfolgreich.
				</Typography>
				<Typography variant="subtitle1" textAlign="justify">
					{this.props.schueler} wurde erfolgreich entschuldigt.
					Sie können diesen Tab nun schließen.
				</Typography>
				{this.props.debug === "true" &&
					<div dangerouslySetInnerHTML={{ __html: this.props.signature }}></div>
				}
			</React.Fragment >
		)
	}
}

export function Wrapper(props: Partial<Props>) {
	const [params] = useSearchParams();
	return (
		<Success
			schueler={props.schueler!}
			signature={props.signature!}
			debug={params.get("debug")!}
		/>
	)
}

const mapStateToProps = (state: RootState) => ({
	schueler: state.login.vorname + " " + state.login.nachname,
	...state.success
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper)