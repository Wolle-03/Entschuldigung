import { Action, createSlice, PayloadAction } from '@reduxjs/toolkit'

export type appStateType = {
	rsa_private_key: string | null,
	rsa_public_key: string
	fontSize: number,
	archive: boolean
}

const initialState: appStateType = {
	rsa_private_key: localStorage.getItem("rsa_private_key"),
	rsa_public_key: `-----BEGIN PUBLIC KEY-----
MIICITANBgkqhkiG9w0BAQEFAAOCAg4AMIICCQKCAgBwnpwy6NzDZzXIOpJ6IF4U
n1FcqCGfYUW7cE0veikrgqpTccqLn5xSrlfJura79E+HwVR5tWDdNXB+dZ33elUJ
kJoXOWgaOiIGf4eY5S1F46ko4AXIoVX/K8X3pVPYz29/pfT4KDQcLGkEDHvWtioZ
dD6fIxd7mRVvgr+365V015RQvmeHs/yMTNHpPcPiZAMA4nMKmi54xqN0goM8goko
Y2qjkkf8e5mLLZPw3+tvWiTJ+OW15H6NBQrl8E4O/NxN0w2l3Beiu27eWEetcTjR
dWzpYBHxwAA0bRfh29CNziyxFHIUsP4cY3OCd3s89SSb8kwQfhe/JOFkP7QTG2lg
lm/s85+RO7mWDu6bXJj6S6XuCG7xmIu2IDYtsIvORUFiIvveRpzhJpsRjuuwPIGB
di/ekgLnk280fUN8W4X09sbY/kUdYUvKIc8s6QLQbovfW7QgzemzELNA9xvYZymg
Pc5dH/I0zbNUl/JsZh/830HtsU2ZQywBZAmXDkjtj5ATBH2F81iG3VUKs/xPBwT9
5c8Bs2s7hAaa2UhwsGfiiUiSgqLxi8OhFfuROEI+qhKjlXK+TU8dE6zo2+u4R1OB
+q7A5wtmWYQ/VR4f/lDAsf0MQ2eZM41k/Cadcl9u04RypYn1ZTEg+ySo8chNrB30
/Ls1uSx5Ug8UixNUNlYGywIDAQAB
-----END PUBLIC KEY-----`,
	fontSize: 15,
	archive: false
}

const AppSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		setRsaPrivateKey: (state, action: PayloadAction<{ key: string, save: boolean }>) => {
			state.rsa_private_key = action.payload.key
			if (action.payload.save)
				localStorage.setItem("rsa_private_key", action.payload.key)
		},
		logout: (state, action: Action) => {
			state.rsa_private_key = null
			localStorage.removeItem("rsa_private_key")
		},
		setFontSize: (state, action: PayloadAction<number>) => {
			state.fontSize = action.payload;
		},
		setShowArchieve: (state, action: PayloadAction<boolean>) => {
			state.archive = action.payload;
		}
	}
});

export const { ...reducers } = AppSlice.actions

export default AppSlice.reducer