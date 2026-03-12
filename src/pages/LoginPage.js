import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    Button, Grid, Box, Typography, Paper, Checkbox, FormControlLabel, TextField,
    CssBaseline, IconButton, InputAdornment, CircularProgress
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LightPurpleButton } from '../components/buttonStyles';
import styled, { keyframes } from 'styled-components';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';

const defaultTheme = createTheme({
    palette: {
        primary: {
            main: '#7f56da',
        },
    },
    typography: {
        fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        },
                        '&.Mui-focused': {
                            backgroundColor: '#fff',
                            boxShadow: '0 4px 20px rgba(127, 86, 218, 0.15)',
                        },
                    },
                },
            },
        },
    },
});

// Animations
const gradientMove = keyframes`
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
`;

const float = keyframes`
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
`;

const shine = keyframes`
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
`;

const LoginPage = ({ role }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);

    const [toggle, setToggle] = useState(false);
    const [loader, setLoader] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [rollNumberError, setRollNumberError] = useState(false);
    const [studentNameError, setStudentNameError] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (role === "Student") {
            const rollNum = event.target.rollNumber.value;
            const studentName = event.target.studentName.value;
            const password = event.target.password.value;

            if (!rollNum || !studentName || !password) {
                if (!rollNum) setRollNumberError(true);
                if (!studentName) setStudentNameError(true);
                if (!password) setPasswordError(true);
                return;
            }
            setLoader(true);
            dispatch(loginUser({ rollNum, studentName, password }, role));
        } else {
            const email = event.target.email.value;
            const password = event.target.password.value;

            if (!email || !password) {
                if (!email) setEmailError(true);
                if (!password) setPasswordError(true);
                return;
            }

            setLoader(true);
            dispatch(loginUser({ email, password }, role));
        }
    };

    const handleInputChange = (event) => {
        const { name } = event.target;
        if (name === 'email') setEmailError(false);
        if (name === 'password') setPasswordError(false);
        if (name === 'rollNumber') setRollNumberError(false);
        if (name === 'studentName') setStudentNameError(false);
    };

    useEffect(() => {
        if (status === 'success' || currentUser !== null) {
            if (currentRole === 'Admin') {
                navigate('/Admin/dashboard');
            } else if (currentRole === 'Student') {
                navigate('/Student/dashboard');
            } else if (currentRole === 'Teacher') {
                navigate('/Teacher/dashboard');
            } else if (currentRole === 'Parent') {
                navigate('/Parent/dashboard');
            }
        } else if (status === 'failed') {
            setMessage(response);
            setShowPopup(true);
            setLoader(false);
        } else if (status === 'error') {
            setMessage("Network Error");
            setShowPopup(true);
            setLoader(false);
        }
    }, [status, currentRole, navigate, error, response, currentUser]);

    return (
        <ThemeProvider theme={defaultTheme}>
            <LoginContainer>
                <BackgroundOverlay />
                <GradientOrbs>
                    <Orb1 />
                    <Orb2 />
                    <Orb3 />
                </GradientOrbs>
                
                <GlassPaper elevation={24}>
                    <LoginContent>
                        <LogoWrapper>
                            <LogoIcon>🎓</LogoIcon>
                        </LogoWrapper>
                        
                        <TitleSection>
                            <WelcomeTitle variant="h4">
                                {role} Login
                            </WelcomeTitle>
                            <WelcomeSubtitle variant="body1">
                                Welcome back! Please enter your details
                            </WelcomeSubtitle>
                        </TitleSection>

                        <StyledForm component="form" noValidate onSubmit={handleSubmit}>
                            {role === "Student" ? (
                                <>
                                    <InputWrapper>
                                        <StyledTextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="rollNumber"
                                            label="Enter your Roll Number"
                                            name="rollNumber"
                                            autoComplete="off"
                                            type="number"
                                            autoFocus
                                            error={rollNumberError}
                                            helperText={rollNumberError && 'Roll Number is required'}
                                            onChange={handleInputChange}
                                        />
                                    </InputWrapper>
                                    <InputWrapper>
                                        <StyledTextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="studentName"
                                            label="Enter your name"
                                            name="studentName"
                                            autoComplete="name"
                                            error={studentNameError}
                                            helperText={studentNameError && 'Name is required'}
                                            onChange={handleInputChange}
                                        />
                                    </InputWrapper>
                                </>
                            ) : (
                                <InputWrapper>
                                    <StyledTextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Enter your email"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                        error={emailError}
                                        helperText={emailError && 'Email is required'}
                                        onChange={handleInputChange}
                                    />
                                </InputWrapper>
                            )}
                            
                            <InputWrapper>
                                <StyledTextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type={toggle ? 'text' : 'password'}
                                    id="password"
                                    autoComplete="current-password"
                                    error={passwordError}
                                    helperText={passwordError && 'Password is required'}
                                    onChange={handleInputChange}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton 
                                                    onClick={() => setToggle(!toggle)}
                                                    sx={{ 
                                                        color: '#7f56da',
                                                        '&:hover': { color: '#5b3bb8' }
                                                    }}
                                                >
                                                    {toggle ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </InputWrapper>

                            <OptionsRow container>
                                <FormControlLabel 
                                    control={
                                        <Checkbox 
                                            value="remember" 
                                            color="primary" 
                                            sx={{
                                                color: '#7f56da',
                                                '&.Mui-checked': { color: '#7f56da' },
                                            }}
                                        />
                                    } 
                                    label="Remember me" 
                                />
                                <StyledLink to={`/${role}ForgotPassword`}>
                                    Forgot password?
                                </StyledLink>
                            </OptionsRow>

                            <LoginButton 
                                type="submit" 
                                fullWidth 
                                variant="contained"
                            >
                                {loader ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
                            </LoginButton>

                            {role === "Admin" && (
                                <SignupRow container>
                                    <Grid>Don't have an account?</Grid>
                                    <Grid item sx={{ ml: 1 }}>
                                        <StyledLink to="/Adminregister">Sign up</StyledLink>
                                    </Grid>
                                </SignupRow>
                            )}
                        </StyledForm>
                    </LoginContent>
                </GlassPaper>
            </LoginContainer>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </ThemeProvider>
    );
};

export default LoginPage;

// Styled Components
const LoginContainer = styled(Box)`
    min-height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(-45deg, #0f0c29, #302b63, #24243e, #1a1a2e);
    background-size: 400% 400%;
    animation: ${gradientMove} 15s ease infinite;
    position: relative;
    overflow: hidden;
    padding: 20px;
`;

const BackgroundOverlay = styled(Box)`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
        radial-gradient(circle at 20% 80%, rgba(127, 86, 218, 0.2) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(77, 181, 255, 0.2) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(16, 185, 129, 0.1) 0%, transparent 40%);
    pointer-events: none;
`;

const GradientOrbs = styled(Box)`
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    pointer-events: none;
`;

const Orb1 = styled(Box)`
    position: absolute;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(127, 86, 218, 0.3) 0%, transparent 70%);
    top: -100px;
    right: -100px;
    animation: ${float} 6s ease-in-out infinite;
`;

const Orb2 = styled(Box)`
    position: absolute;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(77, 181, 255, 0.25) 0%, transparent 70%);
    bottom: -50px;
    left: -50px;
    animation: ${float} 8s ease-in-out infinite reverse;
`;

const Orb3 = styled(Box)`
    position: absolute;
    width: 250px;
    height: 250px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%);
    top: 50%;
    left: 30%;
    animation: ${float} 7s ease-in-out infinite;
    animation-delay: 1s;
`;

const GlassPaper = styled(Paper)`
    border-radius: 24px !important;
    background: rgba(255, 255, 255, 0.95) !important;
    backdrop-filter: blur(20px) !important;
    box-shadow: 
        0 8px 32px rgba(0, 0, 0, 0.3),
        0 0 0 1px rgba(255, 255, 255, 0.1) inset,
        0 -2px 10px rgba(127, 86, 218, 0.1) inset !important;
    max-width: 480px;
    width: 100%;
    position: relative;
    z-index: 1;
    overflow: hidden;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, #7f56da, #4db5ff, #10b981, #7f56da);
        background-size: 200% 100%;
        animation: ${shine} 3s linear infinite;
    }
`;

const LoginContent = styled(Box)`
    padding: 48px 40px;
    
    @media (max-width: 480px) {
        padding: 32px 24px;
    }
`;

const LogoWrapper = styled(Box)`
    display: flex;
    justify-content: center;
    margin-bottom: 24px;
`;

const LogoIcon = styled(Box)`
    width: 72px;
    height: 72px;
    border-radius: 20px;
    background: linear-gradient(135deg, #7f56da 0%, #5b3bb8 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    box-shadow: 0 8px 24px rgba(127, 86, 218, 0.4);
    animation: ${float} 4s ease-in-out infinite;
`;

const TitleSection = styled(Box)`
    text-align: center;
    margin-bottom: 32px;
`;

const WelcomeTitle = styled(Typography)`
    font-weight: 700 !important;
    background: linear-gradient(135deg, #1a1a2e 0%, #7f56da 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 8px !important;
    font-size: 1.75rem !important;
`;

const WelcomeSubtitle = styled(Typography)`
    color: #666;
    font-size: 0.95rem !important;
`;

const StyledForm = styled(Box)`
    display: flex;
    flex-direction: column;
`;

const InputWrapper = styled(Box)`
    margin-bottom: 4px;
`;

const StyledTextField = styled(TextField)`
    & .MuiOutlinedInput-root {
        border-radius: 12px;
        background-color: rgba(248, 250, 252, 0.8);
        transition: all 0.3s ease;
        
        &:hover {
            backgroundColor: rgba(255, 255, 255, 0.95);
            box-shadow: 0 2px 12px rgba(127, 86, 218, 0.1);
        }
        
        &.Mui-focused {
            backgroundColor: #fff;
            box-shadow: 0 4px 20px rgba(127, 86, 218, 0.15);
        }
        
        & fieldset {
            border-color: #e2e8f0;
            transition: all 0.2s ease;
        }
        
        &:hover fieldset {
            border-color: #7f56da !important;
        }
        
        &.Mui-focused fieldset {
            border-color: #7f56da !important;
            border-width: 2px;
        }
    }
    
    & .MuiInputLabel-root {
        color: #64748b;
        font-weight: 500;
        
        &.Mui-focused {
            color: #7f56da;
        }
    }
    
    & .MuiFormHelperText-root {
        color: #ef4444;
        font-weight: 500;
    }
`;

const OptionsRow = styled(Grid)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 8px !important;
    
    & .MuiFormControlLabel-label {
        color: #64748b;
        font-size: 0.875rem;
    }
`;

const LoginButton = styled(Button)`
    && {
        background: linear-gradient(135deg, #7f56da 0%, #5b3bb8 100%);
        color: white;
        font-weight: 600;
        padding: 14px 24px;
        border-radius: 12px;
        font-size: 1rem;
        text-transform: none;
        margin-top: 20px;
        box-shadow: 0 4px 16px rgba(127, 86, 218, 0.4);
        transition: all 0.3s ease;
        
        &:hover {
            background: linear-gradient(135deg, #6b4dc9 0%, #4a2fa6 100%);
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(127, 86, 218, 0.5);
        }
        
        &:active {
            transform: translateY(0);
        }
    }
`;

const SignupRow = styled(Grid)`
    display: flex;
    justify-content: center;
    margin-top: 24px;
    color: #64748b;
    font-size: 0.9rem;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: #7f56da;
    font-weight: 600;
    font-size: 0.875rem;
    transition: all 0.2s ease;
    
    &:hover {
        color: #5b3bb8;
        text-decoration: underline;
    }
`;
