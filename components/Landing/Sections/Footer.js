import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-navy text-navyMuted">
      <div className="w-[90%] mx-auto pt-16 pb-10 space-y-12">

        {/* Brand + Description */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h3 className="text-lg font-semibold text-gold tracking-wide">
            IfinOcean
          </h3>

          <p className="text-white leading-relaxed">
            IfinOcean is a structured investment platform designed around
            predefined earning rules, transparent accounting, and capped returns.
            All investments, earnings, and withdrawals are processed through
            auditable system logic.
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-navyMuted/20" />

        {/* Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-sm">

          {/* Platform */}
          <div className="space-y-4">
            <h4 className="font-medium text-gold">Platform</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-white">How it works</Link></li>
              <li><Link href="/" className="text-white">Packages</Link></li>
              <li><Link href="/" className="text-white">Dashboard</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-medium text-gold">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-white">Terms of Service</Link></li>
              <li><Link href="/" className="text-white">Privacy Policy</Link></li>
              <li><Link href="/" className="text-white">Risk Disclosure</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="font-medium text-gold">Social</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-white">X (Twitter)</Link></li>
              <li><Link href="/" className="text-white">Instagram</Link></li>
              <li><Link href="/" className="text-white">LinkedIn</Link></li>
              <li><Link href="/" className="text-white">YouTube</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-medium text-gold">Contact</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="mailto:support@ifinocean.com"
                  className="text-white"
                >
                  support@ifinocean.com
                </Link>
              </li>
              <li className="text-white uppercase tracking-wide">
                London, United Kingdom
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-navyMuted/20" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-white">

          <p>
            © {new Date().getFullYear()} IfinOcean. All rights reserved.
          </p>

          <p className="text-white">
            Built with transparency · Powered by rules
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;