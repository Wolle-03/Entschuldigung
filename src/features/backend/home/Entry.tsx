import DeleteIcon from '@mui/icons-material/Delete';
import ReportIcon from '@mui/icons-material/Report';
import { IconButton, SvgIcon, TableCell, TableRow, Tooltip } from '@mui/material';
import { Component } from 'react';

type Props = {
	id: number,
	name: string,
	attest_pflicht: boolean,
	class: string,
	time: string,
	reason: string,
	comment: string,
	delete: (id: number) => void,
	showDelete: boolean
}

export default class Entry extends Component<Props> {

	render() {
		return (
			<TableRow
				key={this.props.name}
				sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
			>
				<TableCell component="th" scope="row">{this.props.name}</TableCell>
				<TableCell sx={{ textAlign: "justify" }}>{this.props.class}</TableCell>
				<TableCell sx={{ textAlign: "center" }}>
					{this.props.attest_pflicht &&
						<SvgIcon sx={{ color: 'red' }}>
							<ReportIcon />
						</SvgIcon>
					}</TableCell>
				<TableCell sx={{ textAlign: "justify" }}>{this.props.time}</TableCell>
				<TableCell sx={{ textAlign: "justify" }}>{this.props.reason}</TableCell>
				<TableCell sx={{ textAlign: "justify" }}>{this.props.comment}</TableCell>
				{this.props.showDelete &&
					<TableCell align="center">
						<Tooltip title="Delete">
							<IconButton onClick={() => this.props.delete(this.props.id)}>
								<DeleteIcon />
							</IconButton>
						</Tooltip>
					</TableCell>
				}
			</TableRow >
		)
	}
}