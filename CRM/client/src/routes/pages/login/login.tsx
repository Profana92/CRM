import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcCheckmark, FcCancel } from 'react-icons/fc';
import axios from 'axios';
const initialUsernameState = {
   stringCorrect: true,
   loginDataCorrect: false,
   options: {
      empty: true,
      longerThanSix: false,
      shorterThanFourteen: false,
      containCapital: false,
      containNumber: false,
      containSpecialChar: false,
   },
};
const initialPasswordState = {
   stringCorrect: true,
   loginDataCorrect: false,
   options: {
      empty: true,
      longerThanSix: false,
      shorterThanFourteen: false,
      containCapital: false,
      containNumber: false,
      containSpecialChar: false,
   },
};
function login() {
   const [usernameValidation, setUsernameValidation] = useState(initialUsernameState);
   const [passwordValidation, setPasswordValidation] = useState(initialPasswordState);
   const [oneOfInputsEmpty, setoneOfInputsEmpty] = useState(false);

   const inputNameRef = useRef(null);
   const inputPasswordRef = useRef(null);

   let navigate = useNavigate();
   const routeChange = () => {
      let path = `/`;
      navigate(path);
   };
   useEffect(() => {
      document.title = 'Login';
   }, []);
   useEffect(() => {
      if (
         !usernameValidation.options.empty &&
         usernameValidation.options.containCapital &&
         usernameValidation.options.containNumber &&
         usernameValidation.options.containSpecialChar &&
         usernameValidation.options.longerThanSix &&
         usernameValidation.options.shorterThanFourteen &&
         !passwordValidation.options.empty &&
         passwordValidation.options.containCapital &&
         passwordValidation.options.containNumber &&
         passwordValidation.options.containSpecialChar &&
         passwordValidation.options.longerThanSix &&
         passwordValidation.options.shorterThanFourteen
      ) {
         setUsernameValidation((prevstate) => {
            return { ...prevstate, stringCorrect: true };
         });
         setPasswordValidation((prevstate) => {
            return { ...prevstate, stringCorrect: true };
         });
      }
   }, [
      !usernameValidation.options.empty,
      usernameValidation.options.containCapital,
      usernameValidation.options.containNumber,
      usernameValidation.options.containSpecialChar,
      usernameValidation.options.longerThanSix,
      usernameValidation.options.shorterThanFourteen,
      !passwordValidation.options.empty,
      passwordValidation.options.containCapital,
      passwordValidation.options.containNumber,
      passwordValidation.options.containSpecialChar,
      passwordValidation.options.longerThanSix,
      passwordValidation.options.shorterThanFourteen,
   ]);
   const formSubmitHandler = async (event) => {
      event.preventDefault();
      if (inputNameRef.current.value === '' || inputPasswordRef.current.value === '') setoneOfInputsEmpty(true);
      else setoneOfInputsEmpty(false);
      if (usernameValidation.stringCorrect && passwordValidation.stringCorrect && !usernameValidation.options.empty && !passwordValidation.options.empty) {
         const response = await axios.get(`/api/userdata?username=${inputNameRef.current.value}&password=${inputPasswordRef.current.value}`);
         localStorage.setItem('user', JSON.stringify(response.data));
         if (response.data.logged_in === true) {
            routeChange();
         } else {
            setUsernameValidation(initialUsernameState);
            inputNameRef.current.value = '';
            inputPasswordRef.current.value = '';
         }
      }
   };
   const inputTextValidation = (event) => {
      const inputValue = event.target.value.trim();

      let containsUppercaseLetter = false;

      function containsUppercase() {
         function isUpperCase(str) {
            return str === str.toUpperCase() && str !== str.toLowerCase();
         }
         if (inputValue) {
            [...inputValue].forEach((letter) => {
               if (isUpperCase(letter)) {
                  containsUppercaseLetter = true;
               }
            });
            containsUppercaseLetter === true
               ? setUsernameValidation((prevstate) => {
                    return { ...prevstate, options: { ...prevstate.options, containCapital: true } };
                 })
               : setUsernameValidation((prevstate) => {
                    return { ...prevstate, options: { ...prevstate.options, containCapital: false } };
                 });
         }
      }
      function isLongerThanZero(str) {
         return str.length > 0;
      }
      function isLongerThanSix(str) {
         return str.length > 5;
      }
      function isShorterThanFourteen(str) {
         return str.length < 14;
      }
      function containsNumbers(str) {
         return /\d/.test(str);
      }
      function containsSpecialCharacter(str) {
         const regex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
         return regex.test(str);
      }

      setUsernameValidation({ ...initialUsernameState, stringCorrect: false, options: { ...initialUsernameState.options, empty: false } });

      //Check if empty
      if (!isLongerThanZero(inputValue)) {
         setUsernameValidation({ ...initialUsernameState, options: { ...initialUsernameState.options, empty: true } });
         return;
      } else {
         setUsernameValidation({ ...usernameValidation, stringCorrect: false, options: { ...usernameValidation.options, empty: false } });
      }

      // Check if contains uppercase
      containsUppercase();

      // Check if contains a number
      const hasNumber = containsNumbers(inputValue);
      hasNumber === true
         ? setUsernameValidation((prevstate) => {
              return { ...prevstate, options: { ...prevstate.options, containNumber: true } };
           })
         : setUsernameValidation((prevstate) => {
              return { ...prevstate, options: { ...prevstate.options, containNumber: false } };
           });
      // Check if greater than 6
      isLongerThanSix(inputValue)
         ? setUsernameValidation((prevstate) => {
              return { ...prevstate, options: { ...prevstate.options, longerThanSix: true } };
           })
         : setUsernameValidation((prevstate) => {
              return { ...prevstate, options: { ...prevstate.options, longerThanSix: false } };
           });
      // Check if shorter than 14
      isShorterThanFourteen(inputValue)
         ? setUsernameValidation((prevstate) => {
              return { ...prevstate, options: { ...prevstate.options, shorterThanFourteen: true } };
           })
         : setUsernameValidation((prevstate) => {
              return { ...prevstate, options: { ...prevstate.options, shorterThanFourteen: false } };
           });
      //Check is contains special charater
      containsSpecialCharacter(inputValue)
         ? setUsernameValidation((prevstate) => {
              return { ...prevstate, options: { ...prevstate.options, containSpecialChar: true } };
           })
         : setUsernameValidation((prevstate) => {
              return { ...prevstate, options: { ...prevstate.options, containSpecialChar: false } };
           });
      // Check all and set string to correct
   };
   const inputPasswordValidation = (event) => {
      const inputValue = event.target.value.trim();
      let containsUppercaseLetter = false;

      function containsUppercase() {
         function isUpperCase(str) {
            return str === str.toUpperCase() && str !== str.toLowerCase();
         }
         if (inputValue) {
            [...inputValue].forEach((letter) => {
               if (isUpperCase(letter)) {
                  containsUppercaseLetter = true;
               }
            });
            containsUppercaseLetter === true
               ? setPasswordValidation((prevstate) => {
                    return { ...prevstate, options: { ...prevstate.options, containCapital: true } };
                 })
               : setPasswordValidation((prevstate) => {
                    return { ...prevstate, options: { ...prevstate.options, containCapital: false } };
                 });
         }
      }
      function isLongerThanZero(str) {
         return str.length > 0;
      }
      function isLongerThanSix(str) {
         return str.length > 5;
      }
      function isShorterThanFourteen(str) {
         return str.length < 14;
      }
      function containsNumbers(str) {
         return /\d/.test(str);
      }
      function containsSpecialCharacter(str) {
         const regex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
         return regex.test(str);
      }

      setPasswordValidation({ ...initialPasswordState, options: { ...initialPasswordState.options, empty: false } });

      //Check if empty
      if (!isLongerThanZero(inputValue)) {
         setPasswordValidation({ ...initialPasswordState, stringCorrect: false, options: { ...initialPasswordState.options, empty: true } });
         return;
      } else {
         setPasswordValidation({ ...passwordValidation, stringCorrect: false, options: { ...passwordValidation.options, empty: false } });
      }

      // Check if contains uppercase
      containsUppercase();

      // Check if contains a number
      const hasNumber = containsNumbers(inputValue);
      hasNumber === true
         ? setPasswordValidation((prevstate) => {
              return { ...prevstate, options: { ...prevstate.options, containNumber: true } };
           })
         : setPasswordValidation((prevstate) => {
              return { ...prevstate, options: { ...prevstate.options, containNumber: false } };
           });
      // Check if greater than 6
      isLongerThanSix(inputValue)
         ? setPasswordValidation((prevstate) => {
              return { ...prevstate, options: { ...prevstate.options, longerThanSix: true } };
           })
         : setPasswordValidation((prevstate) => {
              return { ...prevstate, options: { ...prevstate.options, longerThanSix: false } };
           });
      // Check if shorter than 14
      isShorterThanFourteen(inputValue)
         ? setPasswordValidation((prevstate) => {
              return { ...prevstate, options: { ...prevstate.options, shorterThanFourteen: true } };
           })
         : setPasswordValidation((prevstate) => {
              return { ...prevstate, options: { ...prevstate.options, shorterThanFourteen: false } };
           });
      //Check is contains special charater
      containsSpecialCharacter(inputValue)
         ? setPasswordValidation((prevstate) => {
              return { ...prevstate, options: { ...prevstate.options, containSpecialChar: true } };
           })
         : setPasswordValidation((prevstate) => {
              return { ...prevstate, options: { ...prevstate.options, containSpecialChar: false } };
           });
      // Check all and set string to correct
      if (
         !passwordValidation.options.empty &&
         passwordValidation.options.containCapital &&
         passwordValidation.options.containNumber &&
         passwordValidation.options.containSpecialChar &&
         passwordValidation.options.longerThanSix &&
         passwordValidation.options.shorterThanFourteen
      )
         setPasswordValidation((prevstate) => {
            return { ...prevstate, stringCorrect: true };
         });
   };

   return (
      <div className="flex justify-center items-center h-screen">
         <form className="border py-10 px-12 rounded-lg shadow-lg">
            <div className="">
               <label htmlFor="username">Username: </label>
               <input className="h-10 border w-full mb-5" type="text" name="username" id="username" ref={inputNameRef} onChange={inputTextValidation} />{' '}
            </div>
            <div className="text-sm">
               {usernameValidation.stringCorrect === false && (
                  <div>
                     <p className="flex justify-between">
                        <span>Login field not empty</span>
                        <span>{!usernameValidation.options.empty ? <FcCheckmark /> : <FcCancel />}</span>
                     </p>
                     <p className="flex justify-between">
                        <span>Login must contain at least 6 letters</span>
                        <span>{usernameValidation.options.longerThanSix ? <FcCheckmark /> : <FcCancel />}</span>
                     </p>
                     <p className="flex justify-between">
                        <span>Login shorter than 14 letters</span>
                        <span>{usernameValidation.options.shorterThanFourteen ? <FcCheckmark /> : <FcCancel />}</span>
                     </p>
                     <p className="flex justify-between">
                        <span>Login contains a capital letter</span> <span>{usernameValidation.options.containCapital ? <FcCheckmark /> : <FcCancel />}</span>
                     </p>
                     <p className="flex justify-between">
                        <span>Login contains a number</span> <span>{usernameValidation.options.containNumber ? <FcCheckmark /> : <FcCancel />}</span>
                     </p>
                     <p className="flex justify-between">
                        <span>Login contains a special character</span>
                        <span>{usernameValidation.options.containSpecialChar ? <FcCheckmark /> : <FcCancel />}</span>
                     </p>
                  </div>
               )}
            </div>
            <div className="">
               <label htmlFor="password">Password: </label>
               <input
                  className="h-10 border w-full mb-5 hover:border-slate-300"
                  type="password"
                  name="password"
                  id="password"
                  ref={inputPasswordRef}
                  onChange={inputPasswordValidation}
               />
            </div>
            <div className="text-sm">
               {passwordValidation.stringCorrect === false && (
                  <div>
                     <p className="flex justify-between">
                        <span>Password field not empty</span>
                        <span>{!passwordValidation.options.empty ? <FcCheckmark /> : <FcCancel />}</span>
                     </p>
                     <p className="flex justify-between">
                        <span>Password must contain at least 6 letters</span>
                        <span>{passwordValidation.options.longerThanSix ? <FcCheckmark /> : <FcCancel />}</span>
                     </p>
                     <p className="flex justify-between">
                        <span>Password shorter than 14 letters</span>
                        <span>{passwordValidation.options.shorterThanFourteen ? <FcCheckmark /> : <FcCancel />}</span>
                     </p>
                     <p className="flex justify-between">
                        <span>Password contains a capital letter</span>
                        <span>{passwordValidation.options.containCapital ? <FcCheckmark /> : <FcCancel />}</span>
                     </p>
                     <p className="flex justify-between">
                        <span>Password contains a number</span>
                        <span>{passwordValidation.options.containNumber ? <FcCheckmark /> : <FcCancel />}</span>
                     </p>
                     <p className="flex justify-between">
                        <span>Password contains a special character</span>
                        <span>{passwordValidation.options.containSpecialChar ? <FcCheckmark /> : <FcCancel />}</span>
                     </p>
                  </div>
               )}
            </div>
            <div className="">
               <button className="hover:bg-slate-300 p-2 border bg-slate-200 w-full" onClick={formSubmitHandler}>
                  Submit
               </button>
            </div>
            {oneOfInputsEmpty ? <p>All fields need to be filled</p> : ''}
         </form>
      </div>
   );
}

export default login;
