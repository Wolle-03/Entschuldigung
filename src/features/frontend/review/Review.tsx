import { Divider, Grid, ListItemText, Typography } from "@mui/material";
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { loginStateType } from "../login/LoginSlice";
import { reasonStateType } from "../reason/ReasonSlice";
import { timeStateType } from "../time/TimeSlice";

type Props = {
	login: loginStateType,
	time: timeStateType,
	reason: reasonStateType
}

export class Review extends Component<Props> {

	render() {
		return (
			<React.Fragment>
				<Typography variant="h6" gutterBottom>
					Übersicht
				</Typography>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={6}>
						<ListItemText primary="Vorname" secondary={this.props.login.vorname} />
					</Grid>
					<Grid item xs={12} sm={6}>
						<ListItemText primary="Nachname" secondary={this.props.login.nachname} />
					</Grid>
					<Grid item xs={12} sm={6}>
						<ListItemText primary="Klasse" secondary={this.props.login.klasse} />
					</Grid>
					<Grid item xs={12} sm={6}>
						<ListItemText primary="Geburtsdatum" secondary={this.props.login.geb_dat} />
					</Grid>
					<Grid item xs={2} sm={12}>
						<Divider orientation="horizontal" flexItem />
					</Grid>
					{this.props.time.days === "single" &&
						<React.Fragment>
							{this.props.time.at === "today" &&
								<Grid item xs={12} sm={6}>
									<ListItemText primary="Am" secondary="heute" />
								</Grid>
							}
							{this.props.time.at === "another_day" &&
								<Grid item xs={12} sm={6}>
									<ListItemText primary="Am" secondary={new Date(this.props.time.date).toLocaleDateString("de-DE")} />
								</Grid>
							}
							<Grid item xs={12} sm={6}>
								<ListItemText primary="Stunden" secondary={this.props.time.classes.join(". - ") + "."} />
							</Grid>
						</React.Fragment>
					}
					{this.props.time.days === "multiple" &&
						<React.Fragment>
							<Grid item xs={12} sm={6}>
								<ListItemText primary="Von" secondary={new Date(this.props.time.from).toLocaleDateString("de-DE")} />
							</Grid>
							<Grid item xs={12} sm={6}>
								<ListItemText primary="Bis" secondary={new Date(this.props.time.till).toLocaleDateString("de-DE")} />
							</Grid>
						</React.Fragment>
					}
					<Grid item xs={2} sm={12}>
						<Divider orientation="horizontal" flexItem />
					</Grid>
					<Grid item xs={12} sm={6}>
						<ListItemText primary="Grund" secondary={this.props.reason.reason} />
					</Grid>
					{this.props.reason.comment !== "" &&
						<Grid item xs={12} sm={12} textAlign="justify" overflow="auto">
							<ListItemText style={{ "overflowWrap": "anywhere" }} primary="Kommentar" secondary={this.props.reason.comment} />
						</Grid>
					}
					<Grid item xs={2} sm={12}>
						<Divider orientation="horizontal" flexItem />
					</Grid>
				</Grid>
			</React.Fragment >
		)
	}
}

export async function validateReview(props: Props) {
	var requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ ...props.login, ...props.time, ...props.reason })
	};
	return fetch("https://api.mcs-rbg.de/entschuldigungen/", requestOptions)
		.then(response => response.json()).then(data => {
			if ("error" in data)
				return data.error;
			else
				return undefined;
		});
}

const mapStateToProps = (state: RootState) => ({
	login: state.login,
	time: state.time,
	reason: state.reason
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Review)