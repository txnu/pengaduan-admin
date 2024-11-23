import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignInFooter from "./components/footer";

interface SignInProps {
  onLogin: () => void;
}

const SignIn = ({ onLogin }: SignInProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5001/user/login-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      if (result.success) {
        const { role } = result.data;

        if (role == 2) {
          onLogin();
          navigate("/");
        } else {
          alert("Access denied: Insufficient permissions");
        }
      } else {
        alert(result.msg);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <main className="main-content  mt-0">
      <div
        className="page-header align-items-start min-vh-100"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80')`,
        }}>
        <span className="mask bg-gradient-dark opacity-6"></span>
        <div className="container my-auto">
          <div className="row">
            <div className="col-lg-4 col-md-8 col-12 mx-auto">
              <div className="card z-index-0 fadeIn3 fadeInBottom">
                <div className="card-body">
                  <form
                    role="form"
                    className="text-start"
                    onSubmit={handleLogin}>
                    <div
                      className={`input-group input-group-outline my-3 ${
                        email ? "is-filled" : ""
                      }`}>
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div
                      className={`input-group input-group-outline my-3 ${
                        password ? "is-filled" : ""
                      }`}>
                      <label className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-check form-switch d-flex align-items-center mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="rememberMe"
                      />
                      <label
                        className="form-check-label mb-0 ms-3"
                        htmlFor="rememberMe">
                        Remember me
                      </label>
                    </div>
                    <div className="text-center">
                      <button
                        type="submit"
                        className="btn bg-gradient-secondary shadow-secondary w-100 my-4 mb-2">
                        Sign in
                      </button>
                    </div>
                    <p className="mt-4 text-sm text-center">
                      Don't have an account?{" "}
                      <a
                        href="#"
                        className="text-primary text-gradient font-weight-bold">
                        Sign up
                      </a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SignInFooter />
    </main>
  );
};

export default SignIn;
