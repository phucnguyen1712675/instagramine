import {useState} from 'react';

export const useForm = ({initialValues, onSubmit, validate}) => {
  const [values, setValues] = useState(initialValues || {});
  const [touchedValues, setTouchedValues] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleBlur = (event) => {
    const target = event.target;
    const name = target.name;
    setTouchedValues({
      ...touchedValues,
      [name]: true,
    });
    const e = validate(values);
    setErrors({
      ...errors,
      ...e,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const e = validate(values);
    setErrors({
      ...errors,
      ...e,
    });
    onSubmit({values, e});
  };

  return {
    values,
    touchedValues,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
  };
};

// function App() {
//   const {
//     values,
//     touchedValues,
//     errors,
//     handleChange,
//     handleSubmit,
//     handleBlur
//   } = useForm({
//     initialValues: {
//       name: "",
//       email: "",
//       meal: "",
//       isGoing: false
//     },
//     onSubmit(values, errors) {
//       alert(JSON.stringify({ values, errors }, null, 2));
//     },
//     validate(values) {
//       const errors = {};

//       if (values.name === "") {
//         errors.name = "Please enter a name";
//       }

//       return errors;
//     }
//   });

//   return (
//     <div className={styles.App}>
//       <form className={styles.form} onSubmit={handleSubmit}>
//         <h4 className={styles.formTitle}>
//           Add Guest
//           <hr />
//         </h4>
//         <div className={styles.formGroup}>
//           <label htmlFor="name">Full Name</label>
//           <input
//             type="text"
//             name="name"
//             value={values.name}
//             onChange={handleChange}
//           />
//         </div>

//         <div className={styles.formGroup}>
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             name="email"
//             value={values.email}
//             onChange={handleChange}
//           />
//         </div>

//         <div className={styles.inlineGroup}>
//           <div className={styles.formGroup}>
//             <label htmlFor="meal">Meal Preference</label>
//             <select name="meal" value={values.meal} onChange={handleChange}>
//               <option value="1">Jollof Rice</option>
//               <option value="2">Fried Rice</option>
//             </select>
//           </div>

//           <div className={styles.formGroup}>
//             <label htmlFor="meal">Is Going?</label>
//             <input
//               name="isGoing"
//               type="checkbox"
//               value={values.isGoing}
//               onChange={handleChange}
//             />
//           </div>
//         </div>
//         <div className={styles.formGroup}>
//           <button type="submit">Submit</button>
//         </div>
//       </form>
//     </div>
//   );
// }
