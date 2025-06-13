import { useState } from "react";
import {
  LightTheme,
  PassportScoreWidget,
  usePassportScore,
} from "@passportxyz/passport-embed";
import { Buffer } from "buffer";
import "./App.css";

const PASSPORT_API_KEY = import.meta.env.VITE_SCORER_ID || "DEMO.API_KEY";
const PASSPORT_SCORER_ID = import.meta.env.VITE_API_KEY || "14";

const passportEmbedParams = {
  apiKey: PASSPORT_API_KEY,
  scorerId: PASSPORT_SCORER_ID,
  overrideEmbedServiceUrl: "https://embed.staging.passport.xyz",
};

const connectWallet = async () => {
  // Check if MetaMask is installed
  if (typeof window.ethereum === "undefined") {
    alert("Please install MetaMask!");
    return;
  }

  try {
    // Request account access
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    // Get the connected account
    return accounts[0];
  } catch (error) {
    console.error(error);
    alert("Failed to connect to wallet");
  }
};

const generateSignature = async (message: string) => {
  try {
    // Check if MetaMask is installed
    if (typeof window.ethereum === "undefined") {
      alert("Please install MetaMask!");
      return;
    }

    // Request account access if not already connected
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const signerAddress = accounts[0];

    const stringToSign = `0x${Buffer.from(message, "utf8").toString("hex")}`;
    // Sign the message
    const signature = await window.ethereum.request({
      method: "personal_sign",
      params: [stringToSign, signerAddress],
    });

    return signature ? signature : "";
  } catch (error) {
    console.error("Error signing message:", error);
    alert("Failed to sign message");
    throw error;
  }
};

const DirectPassportDataAccess = ({ address }: { address?: string }) => {
  const { data, isError, error } = usePassportScore({
    ...passportEmbedParams,
    address: address,
  });

  return (
    <div style={{ textAlign: "left" }}>
      <h1>This is an app element!</h1>
      <ul>
        <li>Passport Score: {data?.score}</li>
        <li>Passport Threshold: {data?.threshold}</li>
        <li>Is passing threshold: {data?.passingScore ? "True" : "False"}</li>
        <li>
          What stamps?
          <pre>{JSON.stringify(data?.stamps, undefined, 2)}</pre>
        </li>
        {isError && <li>Error: {(error as Error)?.message}</li>}
      </ul>
    </div>
  );
};

function App() {
  const [address, setAddress] = useState<string | undefined>();

  return (
    <div className="container">
      <div className="demo-sample">
        <h4>Dark Theme, collapsed</h4>
        <PassportScoreWidget
          {...passportEmbedParams}
          address={address}
          connectWalletCallback={async () => {
            const address = await connectWallet();
            setAddress(address);
          }}
          generateSignatureCallback={generateSignature}
          collapseMode={"overlay"} // off | shift | overlay
          // theme={{
          //   colors: {
          //     // primary: "255, 255, 0",
          //     // background: "255, 0, 0",
          //     // secondary: "255, 255, 255"
          //   },
          //   radius: {
          //     // button: "0",
          //     // widget: "0",
          //   },

          //   font: {
          //     family: {
          //       // body: "sans",
          //       // heading: "Courier",
          //     },
          //   },
          // }}
        />
      </div>
      <div className="demo-sample">
        <h4>Light Theme</h4>
        <PassportScoreWidget
          {...passportEmbedParams}
          address={address}
          connectWalletCallback={async () => {
            const address = await connectWallet();
            setAddress(address);
          }}
          generateSignatureCallback={generateSignature}
          collapseMode={"off"} // off | shift | overlay
          theme={LightTheme}
        />
      </div>
      <div className="demo-sample">
        <h4>Custom Theme</h4>
        <PassportScoreWidget
          {...passportEmbedParams}
          address={address}
          connectWalletCallback={async () => {
            const address = await connectWallet();
            setAddress(address);
          }}
          generateSignatureCallback={generateSignature}
          collapseMode={"off"} // off | shift | overlay
          theme={{
            colors: {
              primary: "255, 255, 0",
              background: "255, 0, 0",
              secondary: "255, 255, 255",
            },
            radius: {
              button: "0",
              widget: "0",
            },

            font: {
              family: {
                body: "Courier",
                heading: "Courier",
              },
            },
          }}
        />
      </div>
      <div className="demo-sample">
        <DirectPassportDataAccess address={address} />
      </div>
    </div>
  );
}

export default App;
