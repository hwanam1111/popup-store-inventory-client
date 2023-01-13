import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  .swal2-backdrop-hide {
    display: none !important;
  }

  .swal2-container {
    z-index: 1000000 !important;
  }

  .swal2-container-class {
    transform: unset !important;
    top: 0 !important;
    left: 0 !important;
    background-color: rgba(36, 44, 52, 0.7) !important;
    width: 100% !important;
    height: 100vh !important;
    pointer-events: all !important;
  }

  .swal2-popup-class {
    display: block !important;
    width: 500px !important;
    padding: 0 1rem !important;
    margin: 0 60px !important;
  }

  .swal2-icon-class {
    margin: 46px auto 0 auto !important;
    border: 0.15rem solid !important;
  }

  .swal2-html-class {
    margin: 1.25rem auto 0 auto !important;
    text-align: center !important;
    font-size: 1rem !important;
  }

  .swal2-title {
    margin-top: 30px !important;
    text-align: center !important;
    color: #161D24 !important;
    font-size: 1rem !important;
    line-height: 1.375rem !important;
    font-weight: 400 !important;
  }

  .swal2-confirm-button-class {
    margin: 30px 0 16px 0 !important;
    background-color: #01C2FF !important;
    color: #fff !important;
    padding: 0 1.25em !important;
    height: 46px !important;
    font-size: 0.875rem !important;
    font-weight: 700 !important;
    width: 100% !important;
    text-align: center !important;
    border-radius: 0.5rem !important;
  }

  .swal2-actions-class {
    margin-top: 1rem !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    margin: 30px 0 16px 0 !important;
  }

  .swal2-actions-class > .swal2-confirm-button-class {
    margin: 0 !important;
    background-color: #01C2FF !important;
    color: #fff !important;
    padding: 0 1.25em !important;
    height: 35px !important;
    font-size: 0.875rem !important;
    font-weight: 700 !important;
    width: auto !important;
    text-align: center !important;
    border-radius: 0.25rem !important;
  }


  .swal2-cancel-button-class {
    background-color: #ccc !important;
    padding: 0.75em 1.25em !important;
    font-size: 0.875rem !important;
  }

  .animate__animated {
    animation-duration: 0.35s !important;
  }
`;
