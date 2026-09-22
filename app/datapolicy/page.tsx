import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Policy – Crypto Knights",
  robots: { index: false },
};

const IMPRINT_URL = `${process.env.NEXT_PUBLIC_EXTERNAL_URL}/imprint`;
const LAST_UPDATED = "September 2026";

export default function DataPolicyPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12 text-[17px] leading-relaxed">
      <h1 className="text-3xl font-bold mb-2">Data Policy</h1>
      <p className="text-sm opacity-70 mb-8">Last updated: {LAST_UPDATED}</p>

      <Section title="Who is responsible">
        <p>
          This website is a showcase project. The person responsible for it and
          their contact details are listed in the{" "}
          <Link href={IMPRINT_URL} className="text-primary hover:underline">
            imprint
          </Link>{" "}
          of my main website.
        </p>
        <p>
          I don&apos;t use cookies, analytics, tracking or advertising on this
          site.
        </p>
      </Section>

      <Section title="Hosting">
        <p>
          This site is hosted by Vercel Inc., 440 N Barranca Ave #4133, Covina,
          CA 91723, USA. When you visit the site, Vercel automatically processes
          technical data needed to deliver it, such as your IP address, browser
          type, the requested page and the time of the request. This data may be
          processed in the USA. Vercel protects transfers through the EU–US Data
          Privacy Framework and EU standard contractual clauses.
        </p>
        <p>
          Legal basis: my legitimate interest in running a secure, working
          website (Art. 6(1)(f) GDPR). More in{" "}
          <a
            href="https://vercel.com/legal/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Vercel&apos;s privacy policy
          </a>
          .
        </p>
      </Section>

      <Section title="The game and your wallet">
        <p>
          The game runs entirely in your browser. Connecting a crypto wallet is
          optional. If you connect one, your public wallet address is used to
          send you the tokens you collected. I don&apos;t store your wallet
          address on my own servers.
        </p>
        <p>
          The game uses the Arbitrum Sepolia test network. The tokens are test
          tokens and have no monetary value.
        </p>
        <p>
          To read from and send to the blockchain, your browser contacts the
          public Arbitrum Sepolia network endpoint operated by Offchain Labs,
          Inc. (USA). This transmits technical data such as your IP address and
          your wallet address. If you connect with MetaMask, the MetaMask
          software (Consensys Software Inc.) may also exchange data with its own
          servers. Their own privacy policies apply.
        </p>
        <p>
          Please note that blockchain transactions are public and permanent.
          Once tokens are sent, the transaction and your wallet address are
          visible to anyone and can&apos;t be changed or deleted by me or anyone
          else.
        </p>
        <p>
          Legal basis: providing the game you chose to play (Art. 6(1)(b) GDPR).
        </p>
      </Section>

      <Section title="Local storage">
        <p>
          Your browser saves when you last closed the game rules, so they only
          reappear every few days. This stays on your device, is never sent to
          me and contains no personal data. You can delete it anytime by
          clearing your browser&apos;s site data.
        </p>
      </Section>

      <Section title="Links to other sites">
        <p>
          This site links to other websites, for example GitHub and my main
          website. Their own data policies apply once you open them.
        </p>
      </Section>

      <Section title="Your rights">
        <p>
          Under the GDPR you have the right to access, correct and delete your
          personal data, to restrict or object to its processing, and to data
          portability. To use these rights, contact me via the details in the
          imprint.
        </p>
        <p>
          You can also file a complaint with the Austrian Data Protection
          Authority (Österreichische Datenschutzbehörde),{" "}
          <a
            href="https://www.dsb.gv.at"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            dsb.gv.at
          </a>
          .
        </p>
      </Section>
    </main>
  );
}

function Section({
  title,
  children,
}: Readonly<{
  title: string;
  children: React.ReactNode;
}>) {
  return (
    <section className="mb-8 flex flex-col gap-3">
      <h2 className="text-xl font-bold">{title}</h2>
      {children}
    </section>
  );
}
