import React, {useState, SyntheticEvent, useContext} from "react";
import {AppContext} from "../../contexts/AppContext";
import {Link} from "react-router-dom";
import {handleAuth} from "../../services/auth";
import {Avatar, Button, TextField, Typography} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import URLS from '../../constants/Urls';
import "./Forms.scss";
import axios from 'axios';
import {LoginResponse} from '../../interfaces/interfaces'

interface Props {
    history: any;
}

const Login: React.FC<Props> = ({history}) => {
    const {handleErrors} = useContext(AppContext);

    const login = (username: String, password: String): Promise<LoginResponse> => {
        const payload = {username: username, password: password};
        const headers = {'Content-Type': 'application/json'};
        return axios.post<LoginResponse>(URLS.LOGIN_URL, payload, {headers})
            .then(response => {
                console.log(response);
                if (response === null || response.data === null || response.data.responseStatus === null || response.data.responseStatus.code !== '200') {
                    console.log('Invalid credentials..!!')
                }
                return response.data;
            });
    }

    const [formValues, setFormValues] = useState({username: "foo", password: "foo"});

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const {username, password} = formValues;

        if (username && password) {
            try {
                console.log(username + ' : ' + password);
                login(username, password).then((loginResponse) => {
                    console.log(loginResponse);
                    handleAuth(loginResponse, history);
                });
            } catch (err) {
                handleErrors(err);
            }
        }
    };

    return (
        <div className="login-container">
            <Avatar>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1">Login</Typography>
            <form onSubmit={handleSubmit}>
                <TextField required variant="outlined" margin="normal" fullWidth label="username"
                           autoComplete="Username" value={formValues.username}
                           onChange={(e) => setFormValues({...formValues, username: e.target.value})}/>
                <TextField required variant="outlined" margin="normal" fullWidth label="password"
                           autoComplete="Password" value={formValues.password} type="password"
                           onChange={(e) => setFormValues({...formValues, password: e.target.value})}/>
                <Link to="/register">Don't have an account yet?</Link>
                <Button type="submit" fullWidth variant="contained">Login</Button>
            </form>
        </div>
    );
};

export default Login;
