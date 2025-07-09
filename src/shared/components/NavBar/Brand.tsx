"use client";

import Link from "next/link";
import { useRef } from "react";
import Image from "next/image";
import { MAIN_ROUTE } from "@/shared/routes";

/**
 * Brand component
 */
const Brand = () => {
  const linkRef = useRef<HTMLAnchorElement | null>(null);

  return (
    <div>
      <Link href={MAIN_ROUTE} ref={linkRef} />
      <div className="relative h-12 w-44">
        <Image
          src="/images/cotoneb.png"
          alt="COTONEB R.L"
          fill
          className="object-contain hover:cursor-pointer"
          onClick={() => {
            linkRef.current?.click();
          }}
        />
      </div>
    </div>
  );
};
export default Brand;
