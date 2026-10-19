import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { verifyAccountEmail } from "../utils/api.js";
import "./AccountVerification.css";

function AccountVerification() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState(token ? "verifying" : "error");
  const [message, setMessage] = useState(
    token ? "" : "This verification link is missing its token.",
  );

  useEffect(() => {
    if (!token) return undefined;
    let ignore = false;
    verifyAccountEmail(token)
      .then(() => {
        if (!ignore) {
          setStatus("verified");
          setMessage("Your email is verified and your account is ready.");
        }
      })
      .catch((error) => {
        if (!ignore) {
          setStatus("error");
          setMessage(error.message);
        }
      });
    return () => {
      ignore = true;
    };
  }, [token]);

  return (
    <>
      <Navbar />
      <main className="account-verification">
        <h1>
          {status === "verifying"
            ? "Verifying your email..."
            : status === "verified"
              ? "Account activated"
              : "Unable to verify email"}
        </h1>
        {message && <p role={status === "error" ? "alert" : "status"}>{message}</p>}
        {status !== "verifying" && (
          <Link to="/shop" className="account-verification-link">
            Continue to the shop
          </Link>
        )}
      </main>
    </>
  );
}

export default AccountVerification;
