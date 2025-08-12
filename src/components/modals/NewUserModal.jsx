import { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
    
    const userRegex = new RegExp(import.meta.env.VITE_USER_REGEX);
    const pwdRegex = new RegExp(import.meta.env.VITE_PWD_REGEX);
    const emailRegex = new RegExp(import.meta.env.VITE_EMAIL_REGEX, "i");
    const API_URL = import.meta.env.VITE_API_BASE_URL;

function NewUserModal ({modalIsOpen, onModalClose, fetchUsers}) {
    const usernameRef = useRef();
    const errRef = useRef();
    const [step, setStep] = useState(1);
    const [roles, setRoles] = useState([]);
    const [locations, setLocations] = useState([]);
    const [msg, setMsg] = useState('');
    const [typingTimeout, setTypingTimeout] = useState(null);
// Username State
    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);
    const [isAvailable, setIsAvailable] = useState(null);
// Password State
    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);
// Confirm Password State
    const [matchPwd, setMatchPwd] = useState('');
    const [validMatchPwd, setValidMatchPwd] = useState(false);
    const [matchPwdFocus, setMatchPwdFocus] = useState(false);
// Email State
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
// Error Message State
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
// Form 2
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [role, setRole] = useState('0');
    const [location, setLocation] = useState('0');

// Focus on username input field using useEffect, 
    useEffect(() => {
        if (!user) {
        setIsAvailable(null);
        return;
        }
        // Clear the previous timeout
        if (typingTimeout) clearTimeout(typingTimeout);

        // Set a new timeout for 500ms after user stops typing
        const timeout = setTimeout(async () => {
        try {
            const res = await fetch(`${API_URL}/api/check-username?username=${user}`);
            fetchUsers();
            const data = await res.json();
            setIsAvailable(!data.exists);
        } catch (err) {
            console.error("Error checking username:", err);
            setIsAvailable(null);
        }
        }, 100); // delay in ms

        setTypingTimeout(timeout);
    }, [user]);

    useEffect(() => {
        usernameRef.current.focus();
    }, []);

    useEffect(() => {
        const result = userRegex.test(user);
        console.log(result);
        setValidName(result);
    }, [user]);

    useEffect(() => {
        const result = pwdRegex.test(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatchPwd(match);
    }, [pwd, matchPwd]);

    useEffect(() => {
        const result = emailRegex.test(email);
        setValidEmail(result);
    }, [email]);

    useEffect(() => {
        setErrMsg("");
    },[user, pwd, matchPwd]);

    useEffect(() => {
        if(!modalIsOpen) return;
        const fetchRoles = async () => {
            const response = await fetch(`${API_URL}/api/roles`);
            const roles = await response.json();
            setRoles(roles);
        };
        fetchRoles();
    }, [modalIsOpen]);

    useEffect(() => {
        if(!modalIsOpen) return;
        const fetchLocations = async () => {
            const response = await fetch(`${API_URL}/api/locations`);
            const locations = await response.json();
            setLocations(locations);
        };
        fetchLocations();
    }, [modalIsOpen]);
    
    const handleNext = () => {
        setStep(2);
    }

    const handleBack = () => {
        setStep(1);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // If button enabled with JS manipulation
        const v1 = userRegex.test(user);
        const v2 = pwdRegex.test(pwd);
        const v3 = emailRegex.test(email)
        const v4 = isAvailable;

        if(!v1 || !v2 || !v3 || !v4) {
            setErrMsg("All entires must be valid");
            return;
        }else{
            const usersData = {user, pwd, email, firstName, lastName, role, location}
             if (!user || !pwd || !email || !firstName || !lastName || !role || !location) {
                    alert('Please fill out all fields before submitting.');
                    return;
                }
            try {
                const response = await axios.post(`${API_URL}/api/register`, usersData);
                fetchUsers();
                
            } catch (error) {
                console.error('Error',error)
            }
            onModalClose();
        }
    }

    return(<>
    <dialog id="my_modal_3" className="modal" open={modalIsOpen}>
        <div className="modal-box">
            <ul className="steps steps-vertical lg:steps-horizontal w-full justify-between text-small">
                <li className="step step-primary">Credentials</li>
                <li className={step === 1 ? "step" : "step step-primary"}>Account Details</li>
            </ul>
            <p ref={errRef} className={errMsg ? "badge badge-warning errmsg" : "hide"}>
                {errMsg}
            </p>
            <form method="dialog" onSubmit={handleSubmit}>
                {step === 1 && (
                <div>
                    <fieldset className="fieldset">
                    <legend className="fieldset-legend" >Username
                    <div aria-label="success" className={validName ? "status status-success" : 
                                                        !validName && user ? "status status-error" : "hide"}></div>
                    
                    </legend>
                    <input 
                        type="text" 
                        id="username"
                        ref={usernameRef}
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        required
                        aria-invalid={validName ? "false" : "true"}
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)} 
                        className={userFocus && user && !validName ? "input validator" : "input"}/>
                    <p className={userFocus && user && !validName ? "validator-hint" : "hidden"}>
                        - Must be 4 to 24 characters
                        <br/>- containing only letters, numbers, underscores or dash
                    </p>
                    {isAvailable === true && user && validName && <p style={{ color: "green" }}>Username is available</p>}
                    {isAvailable === false &&  <p style={{ color: "red" }}>Username already exists</p>}
                    {isAvailable === null && user && <p>Checking...</p>}
                    </fieldset>
                    <fieldset className="fieldset">
                    <legend className="fieldset-legend" >Password
                        <div aria-label="success" className={validPwd ? "status status-success" : !validPwd && pwd ? "status status-error" : "hide"}></div>
                    </legend>
                    <input 
                        type="password" 
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                        aria-invalid={validPwd ? "false" : "true"}
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)} 
                        className={pwdFocus && pwd && !validPwd ? "input validator" : "input"}
                    />
                    <p  className={pwdFocus && pwd && !validPwd ? "validator-hint" : "hidden"}>
                        - 8 to 24 characters.
                        <br />
                        - Must include uppercase and lowercase, numbers and special characters.
                    </p>
                
                    </fieldset>
                    <fieldset className="fieldset">
                    <legend className="fieldset-legend" >Confirm Password
                        <div aria-label="success" className={validMatchPwd && matchPwd ? "status status-success" : "hide"}></div>
                        <div aria-label="success" className={validMatchPwd || !matchPwd ? "hide" : "status status-error"}></div>
                    </legend>
                    <input 
                        type="password" 
                        onChange={(e) => setMatchPwd(e.target.value)}
                        value={matchPwd}
                        required
                        aria-invalid={validMatchPwd ? "false" : "true"}
                        onFocus={() => setMatchPwdFocus(true)}
                        onBlur={() => setMatchPwdFocus(false)} 
                        className={matchPwdFocus && matchPwd && !validMatchPwd ? "input validator" : "input"}/>
                    <p className={matchPwdFocus && matchPwd && !validMatchPwd ? "validator-hint" : "hidden"}>
                        - Passwords did not match.
                    </p>
                    </fieldset>
                    <fieldset className="fieldset">
                    <legend className="fieldset-legend" >Email
                        <div aria-label="success" className={validEmail && email ? "status status-success" : 
                                                             !validEmail && email ? "status status-error" : "hide"}></div>
                        
                    </legend>
                    <input 
                        type="email"
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                        aria-invalid={validEmail ? "false" : "true"}
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                        className={emailFocus && email && !validEmail ? "input validator" : "input"}
                    />
                    <p id="emailnote" className={emailFocus && email && !validEmail ? "validator-hint" : "hidden"}>
                        -Must be a valid email address. Example: example@email.com
                    </p>
                    </fieldset>
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onModalClose}>✕</button>
                    <button 
                        disabled={!validName || !validPwd || !validMatchPwd || !validEmail || !isAvailable ? true : false} 
                        type={step === 1 ? "" : "submit"} className="btn btn-primary mt-4 align-right" onClick={handleNext}>{step === 1 ? "Next" : "Submit"}
                    </button>
                </div>
                )}
                {step === 2 && (
                    <div>
                        <button className="btn btn-transparent" onClick={handleBack}> &lt;</button>
                    <fieldset className="fieldset">
                    <legend className="fieldset-legend">First Name</legend>
                    <input 
                        type="text"  className="input" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                    </fieldset>
                    <fieldset className="fieldset">
                    <legend className="fieldset-legend">Last Name</legend>
                    <input 
                        type="text" className="input" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                    </fieldset>
                    <fieldset className="fieldset">
                    <legend className="fieldset-legend" >Role</legend>
                    <select type="select"  className="select" value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="0">Select Role</option>
                        {roles.map((role) => (
                            <option key={role.id} value={role.id}>{role.role_name}</option>
                        ))}
                        
                    </select>
                    </fieldset>
                    <fieldset className="fieldset">
                    <legend className="fieldset-legend" >Location</legend>
                    <select type="select"  className="select" value={location} onChange={(e) => setLocation(e.target.value)}>
                        <option value="0">Select Location</option>
                        {locations.map((loc) => (
                            <option key={loc.id} value={loc.id}>{loc.location}</option>
                        ))}
                    </select>
                    </fieldset>
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onModalClose}>✕</button>
                    <button 
                        disabled={!firstName || !lastName || role == 0 || location == 0 ? true : false} 
                        type="submit" 
                        className="btn btn-primary mt-4"
                        >Submit
                    </button>
                </div>
                )}
            </form>
        </div>
    </dialog>
    </>)
}

export default NewUserModal
