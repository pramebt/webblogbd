import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBlogById } from "../../service/blog";

const Showblog = () => {
  const navigate = useNavigate();
  const id = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getBlogById(id);
        setData(res);
      } catch (error) {
        console.error("Show blog failed: ", error);
      }
    };
    fetchData();
  }, [id]);

  if (!data) {
    return (
      <div className="flex justify-center">
        <img src="/assets/icons/Rolling.gif" alt="loading" className="w-24 h-24" />
      </div>
    );
  }

  const elements = [
    { id: 'title',      type: 'title',       data: data.title },
    { id: 'description', type: 'description', data: data.description },
    ...(data.blocks || [])
  ];

  return (
    <div className="pt-20 px-20 py-10">
      {elements.map((block) => {
        const isThai = /[\u0E00-\u0E7F]/.test(block.data);
        const fontClass = isThai ? "font-kanit" : "";

        switch (block.type) {
          case "title":
            return (
              <h1
                key={block.id}
                className={`${fontClass} text-3xl font-bold mb-4`}
              >
                {block.data}
              </h1>
            );

          case "description":
            return (
              <p
                key={block.id}
                className={`${fontClass} text-gray-700 mb-6 whitespace-pre-line`} 
              >
                {block.data}
              </p>
            );

          case "header":
            return (
              <h2
                key={block.id}
                className={`${fontClass} font-semibold text-2xl mb-4 whitespace-pre-line`}
              >
                {block.data}
              </h2>
            );

          case "paragraph":
            return (
              <p
                key={block.id}
                className={`${fontClass} text-base leading-relaxed mb-4 whitespace-pre-line`} 
              >
                {block.data}
              </p>
            );

          case "code":
            return (
              <pre
                key={block.id}
                className={`${fontClass} text-white bg-gray-100 dark:bg-gray-800 p-4 rounded mb-4 overflow-auto whitespace-pre-wrap`} // แก้ตรงนี้!
              >
                <code>{block.data}</code>
              </pre>
            );

          default:
            return (
              <div key={block.id} className={`${fontClass} mb-4 whitespace-pre-line`}> {/* แก้ตรงนี้! */}
                {block.data}
              </div>
            );
        }
      })}

      <button
        onClick={() => navigate(-1)}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Back
      </button>
    </div>
  );
};

export default Showblog;
