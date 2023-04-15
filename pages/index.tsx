import React, { useState } from "react";
import { Header } from "../components/Header";
import Head from "next/head";
import { TwitterTweetEmbed } from "react-twitter-embed";
import SquigglyLines from "../components/SquigglyLines";

const HomePage: React.FC = () => {
  const [figmaLink, setFigmaLink] = useState("");
  const [tailwindClasses, setTailwindClasses] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    const response = await fetch("/api/figmagic", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        figmaLink,
      }),
    });

    const classes = await response.json();
    setTailwindClasses(classes);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col px-4 items-center justify-center min-h-screen bg-gradient-to-r from-slate-600 to-indigo-400 overflow-x-hidden">
      <Header />
      <Head>
        <title>Figma to Tailwind.css</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col items-center w-full max-w-xl mb-6 gap-6 border-gray-300 bg-indigo-50 dark:text-white dark:bg-black dark:border dark:border-white/20 rounded-2xl p-2">
        <form onSubmit={handleSubmit} className="w-full max-w-xl mb-6">
          <div className="flex flex-col items-center justify-center">
            <label
              htmlFor="figmaLink"
              className="block font-inter font-semibold text-gray-700 dark:text-gray-200"
            >
              Figma File Link
              <SquigglyLines />
            </label>

            <input
              type="text"
              id="figmaLink"
              placeholder="https://www.figma.com/file/..."
              className="appearance-none font-inter mt-14 border border-gray-300 dark:border-gray-600 shadow-sm flex flex-col items-center justify-center rounded-lg w-full max-w-md py-2 px-3 bg-custom-gray-bg dark:bg-custom-dark-gray text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline text-center"
              value={figmaLink}
              autoFocus
              onChange={(e) => setFigmaLink(e.target.value)}
            />
            <p className="block font-inter font-bold mt-6 text-gray-700 dark:text-gray-200">
              Let's see what you've got there, pal...
            </p>

            <button
              type="submit"
              className="cursor-pointer font-inter font-semibold py-2 px-4 mt-20 rounded-full blue-button-w-gradient-border text-white text-shadow-0_0_1px_rgba(0,0,0,0.25) shadow-2xl flex flex-row items-center justify-center mt-3"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/1024px-Tailwind_CSS_Logo.svg.png"
                alt="Tailwind CSS logo"
                width="24"
                height="24"
                className="mr-2"
              />
              Convert to Tailwind
            </button>
          </div>
        </form>

        <div
          className={
            isLoading
              ? "flex items-center justify-center w-full max-w-md mb-6"
              : "hidden"
          }
        >
          {isLoading ? (
            <svg
              className="animate-spin h-10 w-10 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : null}
        </div>
        {tailwindClasses && (
          <div className="w-full max-w-md mt-6">
            <div className="flex flex-col rounded-xl bg-white container-w-gradient-border dark:dark-container-w-gradient-border dark:bg-custom-gray p-3 h-full w-full">
              <div className="flex flex-col flex-1">
                <div className="designs-container">
                  <pre className="whitespace-pre-wrap">
                    {JSON.stringify(tailwindClasses, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="w-full max-w-md mt-6">
          <TwitterTweetEmbed tweetId="1645952548149555201" />
        </div>
      </div>
      <footer className="text-center font-inter text-gray-100 text-sm mb-4">
        Made with ❤️ using React, Next.js, Grafbase and Tailwind CSS
      </footer>
    </div>
  );
};

export default HomePage;
