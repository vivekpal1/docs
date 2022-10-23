import { useEffect, useRef, useState } from "react";

interface ResponsiveProps {
  children: React.ReactChild;
  size?: number;
  dark?: boolean;
}

const Responsive = ({ children, size, dark }: ResponsiveProps) => {
  const iframe = useRef(null);
  const [height, setHeight] = useState(150);

  const calcHeight = () => {
    if (iframe.current) {
      // @ts-ignore
      let the_height = iframe.current.contentWindow.document.body.scrollHeight;
      setHeight(the_height + 10);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      calcHeight();
    }, 250);
  }, []);

  return (
    <div
      style={{ height: height }}
      className="mb-2 flex max-h-[48rem] items-center justify-center overflow-hidden rounded-md border border-slate-300 bg-slate-100 transition-all dark:border-slate-700 dark:bg-slate-800"
    >
      <div
        style={{ maxWidth: size + "px" }}
        className="h-full w-full overflow-y-auto overflow-x-hidden bg-white transition-all dark:bg-slate-900"
      >
        <iframe
          ref={iframe}
          aria-label="component preview"
          title="component preview"
          srcDoc={`<html class="flex w-full h-full ${dark && "dark"}">
                <head>
                    <meta charset="utf-8">
                    <title>Component Preview</title>
                    <script src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,line-clamp"></script>
                    <script>
                        tailwind.config = {
                          darkMode: "class"
                        }

                        function removeLink() {
                            var links = document.querySelectorAll("a");
                            for (var index = 0; index < links.length; index++) {
                                links[index].removeAttribute("href");
                            }
                        }
                    </script>
                    <style>
                        * {
                          font-family: 'Nunito', sans-serif;
                        }

                        a {
                          cursor: pointer;
                        }
                    </style>
                    <link rel="preconnect" href="https://fonts.googleapis.com">
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                    <link
                      href="https://fonts.googleapis.com/css2?family=Nunito:wght@200..1000&display=swap"
                      rel="stylesheet"
                    />                
                  </head>
                <body
                    onLoad="removeLink();"
                    style="height: min-content;"
                    class="w-full min-h-full dark:bg-slate-900 bg-white"
                >
                    <main class="flex flex-row flex-wrap gap-2 p-4 items-center justify-center">
                        ${children}
                    </main>
                </body>
            </html>`}
          className="h-full w-full border-0"
        ></iframe>
      </div>
    </div>
  );
};
export default Responsive;
