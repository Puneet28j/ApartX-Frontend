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
import SelectCryptoCurrency from "./Pages/SelectCryptoCurrency";
import ProfileScreen from "./Pages/Profile";
import TransferReceipt from "./Pages/TransferReceipt";

const App = () => {
  return (
    <Router>
      <div className="bg-[#070707] min-h-screen">
        <MobileLayout>
          <Routes>
            <Route
              path="/onboarding-1"
              element={
                <Onboarding
                  mainLogo={OnBoardingOneLogo}
                  text="Trusted by millions of people, part of one part"
                  smallLogo={OnBoardingOneSlider}
                  to="/onboarding-2"
                />
              }
            />
            <Route
              path="/onboarding-2"
              element={
                <Onboarding
                  mainLogo={OnboardingTwoLogo}
                  text="Spend money to generate, passive income"
                  smallLogo={OnboardingTwoSlider}
                  to="/onboarding-3"
                />
              }
            />
            <Route
              path="/onboarding-3"
              element={
                <Onboarding
                  mainLogo={OnboardingThreeLogo}
                  text="Receive Money From Anywhere In The World"
                  smallLogo={OnBoardingOneSlider}
                  to="/getStarted"
                />
              }
            />
            <Route path="/getStarted" element={<GetStarted />} />
            <Route path="/login-register" element={<LoginForm />} />
            <Route path="/register" element={<RegistrationOne />} />
            <Route path="/verify-otp" element={<RegistrationTwo />} />
            <Route path="/main-screen" element={<MainScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/transfer-receipt" element={<TransferReceipt />} />
            <Route
              path="/select-wallet-send"
              element={<SelectCryptoCurrency />}
            />
            {/* Default route */}
            <Route index element={<SplashScreen />} />
          </Routes>
        </MobileLayout>
      </div>
    </Router>
  );
};

export default App;
