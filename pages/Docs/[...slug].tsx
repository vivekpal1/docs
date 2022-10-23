import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import DisplayChildren from "../../components/display/Children";
import DisplayDoc from "../../components/display/Doc";
import Loading from "../../components/loading";

function Doc() {
  const router = useRouter();
  const [data, setData] = useState<any>({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (router.query.slug) {
      setLoading(true);
      fetch(`/api/posts/${(router.query.slug as string[]).join("/")}`)
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          setLoading(false);
        });
    }
  }, [router]);

  if (!data) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-4">
        <h1 className="rounded-md bg-primary-300/20 p-4 text-9xl font-black text-primary-500">
          404
        </h1>
        <div className="text-center text-xl text-slate-900 dark:text-white">
          <p>
            Looks like the documentation for{" "}
            <span className="font-bold">{router.query.slug}</span> is nowhere to
            be found!
          </p>
          <p>Try looking for something else.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {!isLoading ? (
        data.children ? (
          <DisplayChildren data={data} />
        ) : (
          <DisplayDoc data={data} />
        )
      ) : (
        <div className="w-full py-6">
          <Loading />
        </div>
      )}
    </>
  );
}

export default Doc;
