import { Grid, Slider, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { reducers, timeStateType } from "./TimeSlice";

type Props = timeStateType & typeof reducers

export class Time extends Component<Props> {

	render() {
		return (
			<>
				<Typography variant="h6" gutterBottom>
					Zeit
				</Typography>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={12}>
						<ToggleButtonGroup
							fullWidth
							value={this.props.days}
							exclusive
						>
							<ToggleButton
								value="single"
								onClick={() => this.props.setDays("single")}
							>Einen Tag</ToggleButton>
							<ToggleButton
								value="multiple"
								onClick={() => this.props.setDays("multiple")}
							>Mehrere Tage</ToggleButton>
						</ToggleButtonGroup>
					</Grid>
					{this.props.days === "single" &&
						<Grid item xs={12} sm={12}>
							<ToggleButtonGroup
								fullWidth
								value={this.props.at}
								exclusive
							>
								<ToggleButton
									value="today"
									onClick={() => this.props.setAt("today")}
								>Heute</ToggleButton>
								<ToggleButton
									value="another_day"
									onClick={() => this.props.setAt("another_day")}
								>Einen anderen Tag</ToggleButton>
							</ToggleButtonGroup>
						</Grid>}
					{this.props.days === "single" && this.props.at !== "today" && this.props.at !== "" &&
						<Grid item xs={12} sm={12}>
							<TextField
								required
								id="date"
								type="date"
								name="date"
								label="Datum"
								fullWidth
								onChange={(e) => this.props.setDate(e.target.value)}
								defaultValue={this.props.date} />
						</Grid>}
					{this.props.days === "single" && this.props.at !== "" &&
						<Grid item xs={12} sm={12}>
							<label>Stunden</label>
							<Slider
								value={this.props.classes}
								onChange={(e, value) => this.props.setClasses(value as [number, number])}
								min={1}
								max={11}
								marks={[
									{ value: 1, label: "1." },
									{ value: 2, label: "2." },
									{ value: 3, label: "3." },
									{ value: 4, label: "4." },
									{ value: 5, label: "5." },
									{ value: 6, label: "6." },
									{ value: 7, label: "7." },
									{ value: 8, label: "8." },
									{ value: 9, label: "9." },
									{ value: 10, label: "10." },
									{ value: 11, label: "11." }
								]} />
						</Grid>
					}
					{this.props.days === "multiple" &&
						<React.Fragment>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									id="from"
									type="date"
									name="from"
									label="Von"
									fullWidth
									onChange={(e) => this.props.setFrom(e.target.value)}
									defaultValue={this.props.from} />
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									id="till"
									type="date"
									name="till"
									label="Bis"
									fullWidth
									onChange={(e) => this.props.setTill(e.target.value)}
									defaultValue={this.props.till} />
							</Grid>
						</React.Fragment>
					}
				</Grid>
				<style>
					input[type =date]: required: invalid:: -webkit-datetime-edit {"{"}
					color: transparent;
					{"}"}
					input[type =date]: focus:: -webkit-datetime-edit {"{"}
					color: black !important;
					{"}"}
				</style>
			</>
		);
	}
}

export async function validateTime(props: timeStateType) {
	if (props.days === "single")
		if (props.at === "today")
			return undefined;
		else if (props.at === "another_day")
			if (isNaN(Date.parse(props.date)))
				return "Kein Datum ausgewählt";
			else if (new Date(props.date) < new Date())
				return "Bitte ein Datum in der Zukunft auswählen";
			else
				return undefined;
		else
			return "Keinen Tag ausgewählt";
	else if (props.days === "multiple")
		if (isNaN(Date.parse(props.from)))
			return "Bitte ein Startdatum auswählen";
		else if (isNaN(Date.parse(props.till)))
			return "Bitte ein Enddatum auswählen";
		else if (new Date(props.from) < new Date(new Date().getTime() - 24 * 60 * 60 * 1000))
			return "Das Startdatum muss heute sein oder in der Zukunft liegen";
		else if (new Date(props.till) <= new Date(props.from))
			return "Das Enddatum muss nach dem Startdatum sein";
		else
			return undefined;
	else
		return "Bitte Anzahl der Tage auswählen";
}

const mapStateToProps = (state: RootState) => ({ ...state.time })

const mapDispatchToProps = { ...reducers }

export default connect(mapStateToProps, mapDispatchToProps)(Time)