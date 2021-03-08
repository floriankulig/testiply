// import { useEffect, useState } from "react";

// export const useStaticJSON = (lang: "de" | "en", filename: string): any[] => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     let newData: { content: any[] };
//     if (lang) newData = require(`../static/${filename}_${lang}.json`);

//     if (data !== newData.content) {
//       setData(newData.content);
//     }
//   }, [lang, data]);

//   return data;
// };
