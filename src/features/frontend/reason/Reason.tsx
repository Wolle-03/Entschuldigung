import { Grid, TextField, Typography } from '@mui/material';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { reasonStateType, reducers } from "./ReasonSlice";

type Props = reasonStateType & typeof reducers

export class Reason extends Component<Props> {

	render() {
		return (
			<React.Fragment>
				<Typography variant="h6" gutterBottom>
					Grund
				</Typography>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={12}>
						<TextField
							required
							id="reason"
							name="reason"
							label="Grund"
							fullWidth
							placeholder="z.B. Krankheit"
							onChange={(e) => this.props.setReason(e.target.value)}
							defaultValue={this.props.reason}
						/>
					</Grid>
					<Grid item xs={12} sm={12}>
						<TextField
							id="comment"
							name="comment"
							label="Kommentar"
							fullWidth
							multiline
							rows={4}
							onChange={(e) => this.props.setComment(e.target.value)}
							defaultValue={this.props.comment}
						/>
					</Grid>
				</Grid>
			</React.Fragment>
		);
	}
}

export async function validateReason(props: reasonStateType) {
	if (props.reason === "")
		return "Bitte Grund angeben";
	else
		return undefined;
}

const mapStateToProps = (state: RootState) => ({ ...state.reason })

const mapDispatchToProps = { ...reducers }

export default connect(mapStateToProps, mapDispatchToProps)(Reason)