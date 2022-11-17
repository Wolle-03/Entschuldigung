import { Box, Button, Dialog, DialogActions, DialogTitle, Typography } from '@mui/material'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import JSEncrypt from 'jsencrypt'
import { Component } from 'react'
import Dropzone from 'react-dropzone'
import { connect } from 'react-redux'
import { reducers as actions } from '../AppSlice'
import { RootState } from '../store'

type Props = {
	rsa_private_key: string | null,
	rsa_public_key: string,
	setRsaPrivateKey: ActionCreatorWithPayload<{ key: string; save: boolean; }, string>
}

type State = {
	open: boolean
}

enum SaveAction {
	INTERRUPTED, SAVE, DROP
}

export class Login extends Component<Props, State> {

	privateKey = "";
	state = {
		open: false
	}

	onDrop = async (files: File[]) => {
		this.privateKey = await files[0].text();
		let encrypt = new JSEncrypt()
		encrypt.setPublicKey(this.props.rsa_public_key);
		encrypt.setPrivateKey(this.privateKey);
		const encrypted = encrypt.encrypt("Hello World!")
		if (encrypted && encrypt.decrypt(encrypted) === "Hello World!")
			this.setState({ open: true })
	};

	handleClose = (save: SaveAction) => {
		switch (save) {
			case SaveAction.SAVE:
				localStorage.setItem("rsa_private_key", this.privateKey)
				this.props.setRsaPrivateKey({ key: this.privateKey, save: false })
				this.setState({ open: false })
				break
			case SaveAction.DROP:
				this.props.setRsaPrivateKey({ key: this.privateKey, save: false })
				this.setState({ open: false })
				break
			case SaveAction.INTERRUPTED:
				this.setState({ open: false })
				break
		}
	}

	render() {
		return (
			<>
				<Dropzone onDrop={this.onDrop} >
					{({ getRootProps, getInputProps }) => (
						<Box {...getRootProps({ className: 'dropzone' })} sx={{ p: 2, border: '1px dashed grey', margin: 2, borderRadius: 5, height: 600, textAlign: "center" }}>
							<input {...getInputProps()} />
							<Typography sx={{ fontSize: 30, marginTop: 30 }}>Drag 'n' drop the key here, or click to select a key</Typography>
						</Box>
					)}
				</Dropzone>
				<Dialog
					open={this.state.open}
					onClose={() => this.handleClose(SaveAction.INTERRUPTED)}
				>
					<DialogTitle>
						Save the key for the future
					</DialogTitle>
					<DialogActions>
						<Button onClick={() => this.handleClose(SaveAction.SAVE)}>Save</Button>
						<Button onClick={() => this.handleClose(SaveAction.DROP)}>Don't save</Button>
					</DialogActions>
				</Dialog>
			</>
		)
	}
}

const mapStateToProps = (state: RootState) => ({ ...state.app })

const mapDispatchToProps = { setRsaPrivateKey: actions.setRsaPrivateKey }

export default connect(mapStateToProps, mapDispatchToProps)(Login)