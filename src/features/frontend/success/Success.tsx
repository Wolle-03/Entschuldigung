import { Grid, TextField, Typography } from "@mui/material";
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';

type Props = { schueler: string }

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
			</React.Fragment >
		)
	}
}

const mapStateToProps = (state: RootState) => ({
	schueler: state.login.vorname + " " + state.login.nachname
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Success)