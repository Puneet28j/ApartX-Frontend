import OnBoardingOneSlider from "./assets/onboadingOneSlider.svg";
import OnBoardingOneLogo from "./assets/OnBoardingOneLogo.svg";
import OnboardingTwoLogo from "./assets/OnBoardingTwoLogo.svg";
import OnboardingThreeLogo from "./assets/OnBoardingThreeLogo.svg";
import OnboardingTwoSlider from "./assets/OnBoardingTwoSlider.svg";
import Onboarding from "./Pages/Onboarding-1";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SplashScreen from "./Pages/SplashScreen";
import GetStarted from "./Pages/GetStarted";
import MobileLayout from "./components/Layout/MobileLayout";
import LoginForm from "./Pages/LoginForm";
import RegistrationOne from "./Pages/RegistrationOne";
import RegistrationTwo from "./Pages/RegistrationTwo";
import MainScreen from "./Pages/MainScreen";
import ProfileScreen from "./Pages/Profile";
import TransferReceipt from "./Pages/TransferReceipt";
import ReceiveCurrency from "./Pages/ReceiveCurrency";
import SendCurrency from "./Pages/SendCurrency";
import Passbook from "./Pages/PassBook";
import InviteAndEarn from "./Pages/Invite&Earn";
import ReceiveFinal from "./Pages/ReceiveFinal";
import RequestSubmitted from "./Pages/RequestSubmitted";

const App = () => {
  return (
    <Router>
      <div className="bg-[#070707] min-h-screen">
        <Routes>
          <Route
            path="/onboarding-1"
            element={
              <MobileLayout>
                <Onboarding
                  mainLogo={OnBoardingOneLogo}
                  text="Trusted by millions of people, part of one part"
                  smallLogo={OnBoardingOneSlider}
                  to="/onboarding-2"
                />
              </MobileLayout>
            }
          />
          <Route
            path="/onboarding-2"
            element={
              <MobileLayout>
                <Onboarding
                  mainLogo={OnboardingTwoLogo}
                  text="Spend money to generate, passive income"
                  smallLogo={OnboardingTwoSlider}
                  to="/onboarding-3"
                />
              </MobileLayout>
            }
          />
          <Route
            path="/onboarding-3"
            element={
              <MobileLayout>
                <Onboarding
                  mainLogo={OnboardingThreeLogo}
                  text="Receive Money From Anywhere In The World"
                  smallLogo={OnBoardingOneSlider}
                  to="/getStarted"
                />
              </MobileLayout>
            }
          />
          <Route
            path="/getStarted"
            element={
              <MobileLayout>
                <GetStarted />
              </MobileLayout>
            }
          />
          <Route
            path="/login-register"
            element={
              <MobileLayout>
                <LoginForm />
              </MobileLayout>
            }
          />
          <Route
            path="/register"
            element={
              <MobileLayout>
                <RegistrationOne />
              </MobileLayout>
            }
          />
          <Route
            path="/verify-otp"
            element={
              <MobileLayout>
                <RegistrationTwo />
              </MobileLayout>
            }
          />
          <Route
            path="/main-screen"
            element={
              <MobileLayout>
                <MainScreen />
              </MobileLayout>
            }
          />
          <Route
            path="/profile"
            element={
              <MobileLayout>
                <ProfileScreen />
              </MobileLayout>
            }
          />
          <Route
            path="/transfer-receipt"
            element={
              <MobileLayout>
                <TransferReceipt />
              </MobileLayout>
            }
          />
          <Route
            path="/select-wallet-send"
            element={
              <MobileLayout>
                <SendCurrency />
              </MobileLayout>
            }
          />
          <Route
            path="/select-wallet-receive"
            element={
              <MobileLayout>
                <ReceiveCurrency />
              </MobileLayout>
            }
          />
          <Route
            path="/receive-final"
            element={
              <MobileLayout>
                <ReceiveFinal />
              </MobileLayout>
            }
          />
          <Route
            path="/request-submitted"
            element={
              <MobileLayout>
                <RequestSubmitted />
              </MobileLayout>
            }
          />
          <Route
            path="/passbook"
            element={
              <MobileLayout>
                <Passbook />
              </MobileLayout>
            }
          />
          <Route
            path="/invite-and-earn"
            element={
              <MobileLayout>
                <InviteAndEarn />
              </MobileLayout>
            }
          />

          {/* Default route */}
          <Route
            index
            element={
              <MobileLayout>
                <SplashScreen />
              </MobileLayout>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
