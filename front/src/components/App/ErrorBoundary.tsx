import * as React from "react"

import { ModalWithReload } from "../common/ModalWithReload"

export class ErrorBoundary extends React.Component<{ children: React.ReactNode }> {
  state = { hasError: false }

  static getDerivedStateFromError(_error: Error) {
    return { hasError: true }
  }

  componentDidCatch(_error: Error, _info: any) {
    // should log error
  }

  render = () => {
    if (!this.state.hasError) {
      return this.props.children
    }

    return <ModalWithReload message={"Something went wrong."} />
  }
}
