import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#1D4ED8] text-white">
      <div className="w-[90%] mx-auto px-4 sm:px-0 pt-12 flex flex-col items-center">
        {/* Company Description */}
        <p className="text-center mb-8 max-w-3xl">
          IfinOcean is an investment platform designed to make investing
          accessible and profitable. All trademarks, logos and brand names are
          the property of their respective owners. Platform services are
          provided in partnership with licensed cryptocurrency operators.
        </p>

        {/* Links Section */}
        <div className="w-full border-t border-b border-white border-opacity-20 py-8 my-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Quick Links */}
            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/">How it works</Link>
                </li>
                <li>
                  <Link href="/">Services</Link>
                </li>
                <li>
                  <Link href="/">FAQs</Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/">Terms of Service</Link>
                </li>
                <li>
                  <Link href="/">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/">Risk Disclosure</Link>
                </li>
              </ul>
            </div>

            {/* Socials */}
            <div>
              <h3 className="font-bold mb-4">Socials</h3>
              <div className="grid grid-cols-2 gap-2">
                <Link href="/">X (formerly Twitter)</Link>
                <Link href="/">Instagram</Link>
                <Link href="/">Facebook</Link>
                <Link href="/">TikTok</Link>
                <Link href="/">YouTube</Link>
                <Link href="/">LinkedIn</Link>
              </div>
            </div>

            {/* Contact Us */}
            <div>
              <h3 className="font-bold mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="mailto:support@ifinocean.com">
                    Email: support@ifinocean.com
                  </Link>
                </li>
                {/* <li>
                  <Link href="tel:+102036023946">Phone: 02036023946</Link>
                </li> */}
                <li>London, UK</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-sm mb-8">© 2025 IfinOcean. All rights reserved.</p>

        {/* Gradient Image */}
        <div className="w-full p-5 h-[214px] mx-auto relative overflow-hidden">
          {/* <div className="absolute inset-0 bg-gradient-to-b from-[#00D9E5] via-[#00C6D1] to-[#00B4BE]"></div> */}
          <Image
            src="/Images/BillionBe.svg"
            alt="Gradient Logo"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
