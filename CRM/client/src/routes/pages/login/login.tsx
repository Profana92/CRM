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
      if (usernameValidation.stringCorrect && passwordValidation.stringCorrect && !usernameValidation.options.empty && !passwordValidation.options.empty) {
         const response = await axios.get(`/userdata?username=${inputNameRef.current.value}&password=${inputPasswordRef.current.value}`);
         localStorage.setItem('user', JSON.stringify(response.data));
         if (response.data.logged_in === true) {
            console.log('CO JEST KURWA');
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
      <>
         <form>
            <label htmlFor="username">Username: </label>
            <input className="h-12 border" type="text" name="username" id="username" ref={inputNameRef} onChange={inputTextValidation} />
            {usernameValidation.stringCorrect === false && (
               <div>
                  <p>
                     Login field not empty <span>{!usernameValidation.options.empty ? <FcCheckmark /> : <FcCancel />}</span>
                  </p>
                  <p>
                     Login must contain at least 6 letters <span>{usernameValidation.options.longerThanSix ? <FcCheckmark /> : <FcCancel />}</span>
                  </p>
                  <p>
                     Login shorter than 14 letters <span>{usernameValidation.options.shorterThanFourteen ? <FcCheckmark /> : <FcCancel />}</span>
                  </p>
                  <p>
                     Login contains a capital letter <span>{usernameValidation.options.containCapital ? <FcCheckmark /> : <FcCancel />}</span>
                  </p>
                  <p>
                     Login contains a number <span>{usernameValidation.options.containNumber ? <FcCheckmark /> : <FcCancel />}</span>
                  </p>
                  <p>
                     Login contains a special character <span>{usernameValidation.options.containSpecialChar ? <FcCheckmark /> : <FcCancel />}</span>
                  </p>
               </div>
            )}
            <label htmlFor="password">Password: </label>
            <input className="h-12 border" type="password" name="password" id="password" ref={inputPasswordRef} onChange={inputPasswordValidation} />
            {passwordValidation.stringCorrect === false && (
               <div>
                  <p>
                     Password field not empty <span>{!passwordValidation.options.empty ? <FcCheckmark /> : <FcCancel />}</span>
                  </p>
                  <p>
                     Password must contain at least 6 letters<span>{passwordValidation.options.longerThanSix ? <FcCheckmark /> : <FcCancel />}</span>
                  </p>
                  <p>
                     Password shorter than 14 letters <span>{passwordValidation.options.shorterThanFourteen ? <FcCheckmark /> : <FcCancel />}</span>
                  </p>
                  <p>
                     Password contains a capital letter <span>{passwordValidation.options.containCapital ? <FcCheckmark /> : <FcCancel />}</span>
                  </p>
                  <p>
                     Password contains a number <span>{passwordValidation.options.containNumber ? <FcCheckmark /> : <FcCancel />}</span>
                  </p>
                  <p>
                     Password contains a special character <span>{passwordValidation.options.containSpecialChar ? <FcCheckmark /> : <FcCancel />}</span>
                  </p>
               </div>
            )}
            <button className="m-1 p-2 border bg-slate-500" onClick={formSubmitHandler}>
               Submit
            </button>
         </form>
      </>
   );
}

export default login;
