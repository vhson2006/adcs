import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./error-fallback";
import MainLayout from "../layouts/main";
import BaristaLayout from "../layouts/barista";
import BaristaInsideLayout from "../layouts/barista-inside";

const NotFoundPage = lazy(() => import("../../pages/error/main"));
const LoginPage = lazy(() => import("../../pages/login/main"));
const ForgotPasswordPage = lazy(() => import("../../pages/forgot-password/main"));
const ResetPasswordPage = lazy(() => import("../../pages/reset-password/main"));
const ProfilePage = lazy(() => import("../../pages/profile/main"));
const RedeemPage = lazy(() => import("../../pages/redeem/main"));
const RefereePage = lazy(() => import("../../pages/referee/main"));
const RefereeSuccessPage = lazy(() => import("../../pages/referee-success/main"));
const HandedOutPage = lazy(() => import("../../pages/handed-out/main"));
const ReportPage = lazy(() => import("../../pages/report/main"));

const RenderLoading = () => <p>Loading</p>;
const RouterComponent = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={RenderLoading()}>
              <BaristaLayout component={<LoginPage />} />
            </Suspense>
          </ErrorBoundary>
        </Route>
        <Route exact path="/forgot-password">
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={RenderLoading()}>
              <BaristaLayout component={<ForgotPasswordPage />} />
            </Suspense>
          </ErrorBoundary>
        </Route>
        <Route exact path="/reset-password/:token">
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={RenderLoading()}>
              <BaristaLayout component={<ResetPasswordPage />} />
            </Suspense>
          </ErrorBoundary>
        </Route>
        <Route exact path="/profile">
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={RenderLoading()}>
              <BaristaInsideLayout component={<ProfilePage />} />
            </Suspense>
          </ErrorBoundary>
        </Route>
        <Route exact path="/redeem">
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={RenderLoading()}>
              <BaristaInsideLayout component={<RedeemPage />} />
            </Suspense>
          </ErrorBoundary>
        </Route>
        <Route exact path="/handed-out">
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={RenderLoading()}>
              <BaristaInsideLayout component={<HandedOutPage />} />
            </Suspense>
          </ErrorBoundary>
        </Route>
        <Route exact path="/cafe/:code">
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={RenderLoading()}>
              <MainLayout component={<RefereePage />} />
            </Suspense>
          </ErrorBoundary>
        </Route>
        <Route exact path="/referee-success">
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={RenderLoading()}>
              <MainLayout component={<RefereeSuccessPage />} />
            </Suspense>
          </ErrorBoundary>
        </Route>
        <Route exact path="/redeem-report">
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={RenderLoading()}>
              <ReportPage />
            </Suspense>
          </ErrorBoundary>
        </Route>
        <Route path="*" exact={true}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={RenderLoading()}>
              <MainLayout component={<NotFoundPage />} />
            </Suspense>
          </ErrorBoundary>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default RouterComponent;
