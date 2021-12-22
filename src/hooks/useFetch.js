import {useState, useEffect} from 'react';

const useFetch = () => {
  const [data, setData] = useState({
    slug: '',
    results: [],
  });

  useEffect(() => {
    // if (data.slug !== '') {
    //   const timeoutId = setTimeout(() => {
    //     const fetch = async () => {
    //       try {
    //         const res = await got.get(`/${data.slug}`);
    //         setData({...data, results: res.data});
    //       } catch (err) {
    //         console.error(err);
    //       }
    //     };
    //     fetch();
    //   }, 1000);
    //   return () => clearTimeout(timeoutId);
    // }
  }, [data.slug]);

  return {data, setData};
};

export {useFetch};

// import axios from "axios";

// export default axios.create({
//   baseURL: "https://game-of-thrones-quotes.herokuapp.com/v1/house",
// });

// export default function App() {
//   const { data, setData } = useFetch();
//   return (
//     <main>
//       <input
//         type="text"
//         placeholder="Type your favorite house"
//         value={data.slug}
//         onChange={(e) => setData({ ...data, slug: e.target.value })}
//       />
//       <br />
//       {data.results.length > 0 ? <House family={data.results[0]} /> : null}
//     </main>
//   );
// }
