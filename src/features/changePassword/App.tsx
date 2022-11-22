import { Alert, AppBar, Box, Button, FormControl, Grid, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../..';

const App = () => {
	const [vorname, setVorname] = useState("")
	const [nachname, setNachname] = useState("")
	const [oldPassword, setOldPassword] = useState("")
	const [newPassword, setNewPassword] = useState("")
	const [confirmNewPassword, setConfirmNewPassword] = useState("")
	const [error, setError] = useState<string | undefined>()

	useEffect(() => {
		setError(undefined);
	}, [vorname, nachname, oldPassword, newPassword, confirmNewPassword])


	const changePassword = async () => {
		if (vorname === "")
			return setError("Bitte den Vornamen eingeben");
		if (nachname === "")
			return setError("Bitte den Nachnamen eingeben");
		if (oldPassword === "")
			return setError("Bitte altes Passwort eingeben");
		if (newPassword === "")
			return setError("Bitte neues Passwort eingeben");
		if (confirmNewPassword === "")
			return setError("Bitte neues Passwort wiederholen");
		setError(
			await axios.post(API_BASE_URL + "changePassword.php", { vorname, nachname, oldPassword, newPassword, confirmNewPassword })
				.then(response => "error" in response.data ? response.data.error : window.location.replace("/"))
				.catch((error) => console.log(error)))
	}

	return (
		<>
			<Typography component="h1" variant="h4" align="center" sx={{ marginBottom: 2 }}>
				Passwort ändern
			</Typography>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={6}>
					<TextField
						required
						id="firstName"
						name="firstName"
						label="Vorname"
						fullWidth
						autoComplete="given-name"
						placeholder="Max"
						onChange={(e) => setVorname(e.target.value)}
						value={vorname}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						required
						id="lastName"
						name="lastName"
						label="Nachname"
						fullWidth
						autoComplete="family-name"
						placeholder="Mustermann"
						onChange={(e) => setNachname(e.target.value)}
						value={nachname}
					/>
				</Grid>
				<Grid item xs={12} sm={12}>
					<FormControl fullWidth variant="outlined">
						<InputLabel htmlFor="old-password">Altes Passwort *</InputLabel>
						<OutlinedInput
							required
							id="old-password"
							type="password"
							name="old-password"
							label="Altes Passwort"
							fullWidth
							placeholder="12345"
							onChange={(e) => setOldPassword(e.target.value)}
							value={oldPassword}
						/>
					</FormControl>
				</Grid>
				<Grid item xs={12} sm={12}>
					<FormControl fullWidth variant="outlined">
						<InputLabel htmlFor="new-password">Neues Passwort *</InputLabel>
						<OutlinedInput
							required
							id="new-password"
							type="password"
							name="new-password"
							label="Neues Passwort"
							fullWidth
							placeholder="12345"
							onChange={(e) => setNewPassword(e.target.value)}
							value={newPassword}
						/>
					</FormControl>
				</Grid>
				<Grid item xs={12} sm={12}>
					<FormControl fullWidth variant="outlined">
						<InputLabel htmlFor="confirm-new-password">Neues Passwort wiederholen *</InputLabel>
						<OutlinedInput
							required
							id="confirm-new-password"
							type="password"
							name="confirm-new-password"
							label="Neues Passwort wiederholen"
							fullWidth
							placeholder="12345"
							onChange={(e) => setConfirmNewPassword(e.target.value)}
							value={confirmNewPassword}
						/>
					</FormControl>
					<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
						{error === undefined ?
							<Button
								variant="contained"
								onClick={changePassword}
								sx={{ mt: 3, ml: 1 }}
							>
								Abschicken
							</Button> :
							<Alert sx={{ mt: 3, width: "100%" }} severity="error">{error}</Alert>
						}
					</Box>
				</Grid>
			</Grid>
			<AppBar
				position="relative"
				color="default"
				sx={{
					width: '100%',
					position: 'fixed',
					bottom: 0,
					left: 0,
					right: 0,
					p: 0,
					borderTop: (theme) => `1px solid ${theme.palette.divider}`,
				}}
			>
				<Grid sx={{ display: 'flex' }}>
					<Typography sx={{
						position: 'relative',
						left: 5,
					}} variant="h6" color="rgba(0, 0, 0, 0.5)">
						by {`${process.env.REACT_APP_AUTHOR}`}
					</Typography>
					<Typography sx={{
						position: 'fixed',
						right: 5,
					}} variant="h6" color="rgba(0, 0, 0, 0.5)">
						v{`${process.env.REACT_APP_VERSION}`}
					</Typography>
				</Grid>
			</AppBar>
		</>
	);
}

export default App