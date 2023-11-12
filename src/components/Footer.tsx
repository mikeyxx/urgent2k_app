import Link from "next/link";
import React from "react";
import { FaTwitter, FaLinkedinIn, FaTiktok } from "react-icons/fa";

function Footer() {
  return (
    <section className="h-44 w-full flex flex-col xl:flex-row justify-between items-center p-4 bg-gray-300">
      <div className="flex gap-6">
        <h2>Urgent2k</h2>
        <p>&copy;{new Date().getFullYear()}</p>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-xl">Connect with us on our socials</h2>
        <div className="flex place-content-center text-xl gap-12">
          <FaTwitter className="cursor-pointer" />
          <FaLinkedinIn className="cursor-pointer" />
          <FaTiktok className="cursor-pointer" />
        </div>
      </div>
      <div className="flex gap-6">
        <Link href="/about_page">About</Link>
        <Link href="/contact_page">Contact</Link>
        <Link href="">Privacy Policy</Link>
      </div>
    </section>
  );
}

export default Footer;
