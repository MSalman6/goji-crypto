import { Link } from "react-router-dom";

const FarmingDark = () => {
    return ( 
        <div className="farming">
            <link rel="stylesheet" href="static/css/style-dark.css" />

            <img alt="" className="top-watermark" src="static/img/top-right-ic.svg" />
            <img alt="" className="position-absolute sg-1 desktop" src="static/img/sg-1-desktop.svg" />
            <img alt="" className="position-absolute sg-1 mobile" src="static/img/sg-1-mobile.svg" />
            <img alt="" className="position-absolute sg-2 mobile" src="static/img/sg-2-mobile.svg" />
            <img alt="" className="position-absolute sg-2" src="static/img/green-shadow.svg" />

            <div className="container banner-content">
                <div className="row m-0 position-relative mt-5">
                    <div className="col-sm-12 banner-desc px-sm-5 text-center">
                        <h1 className="mb-4">Goji Farming</h1>
                    </div>
                </div>
            </div>
            <div className="container py-sm-4 px-sm-5">
                <div className="d-flex sorting-filters align-items-center">
                    <div className="mx-sm-3 my-sm-0 my-3 active-tabs">
                        <ul className="nav nav-tabs" id="ex1" role="tablist">
                            <li className="nav-item px-sm-3 px-1 py-2" role="presentation">
                                <a className="nav-link active" id="ex1-tab-1" data-mdb-toggle="tab" href="#ex1-tabs-1" role="tab" aria-controls="ex1-tabs-1" aria-selected="true">Active</a>
                            </li>
                            <li className="nav-item px-sm-3 px-1 py-2" role="presentation">
                                <a className="nav-link" id="ex1-tab-2" data-mdb-toggle="tab" href="#ex1-tabs-2" role="tab" aria-controls="ex1-tabs-2" aria-selected="false">Inactive</a>
                            </li>
                        </ul>
                    </div>

                    <div className="mx-sm-3 my-sm-0 my-3 staked-toggle align-items-center d-flex">
                        <label className="switch">
                            <input type="checkbox" defaultChecked />
                            <span className="slider round"></span>
                        </label>
                        <div className="ms-3"><span className="">Staked only</span></div>
                    </div>



                    <div className="me-sm-3 my-sm-0 my-3 search-inputs d-flex ms-sm-auto">
                        <div className="fil-dropdown me-sm-3">
                            <select className="browser-default custom-select">
                                <option defaultChecked>APR</option>
                            </select>
                        </div>
                        <div className="fil-input">
                            <input type="text" className="form-control" placeholder="Search by name" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="tab-content" id="ex1-content">
                <div className="tab-pane fade show active" id="ex1-tabs-1" role="tabpanel" aria-labelledby="ex1-tab-1">
                    <div className="container P-C-container p-3 ">
                        <div className="row m-0 position-relative px-sm-5 curr-row">

                            <div className="col-sm-4 my-3">
                                <div className="curr-item stake-item px-4 py-4">
                                    <div className="curr-header pt-3">
                                        <div className="d-flex justify-content-center align-items-center">
                                            <div className="me-auto">
                                                <img alt="" src="static/img/farming-hanu-ic.svg" />
                                            </div>
                                            <div className="m-auto">
                                                <h2 className="curr-name mb-0">Farm HANU</h2>
                                            </div>
                                            <div className="ms-auto">
                                                <img alt="" src="static/img/farming-weith-ic.svg" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex mt-5 mb-5">
                                        <div className="me-2">
                                            <span className="curr-x-val d-flex align-items-center justify-content-center">15X</span>
                                        </div>
                                        <div className="me-2">
                                            <span className="curr-x-farm d-flex align-items-center justify-content-center">HANU/WEITH</span>
                                        </div>
                                    </div>

                                    <div className="curr-props mt-4">
                                        <div className="d-flex my-2">
                                            <h3 className="me-auto">Total Staked</h3>
                                            <h3 className="ms-auto">$2,682,493</h3>
                                        </div>
                                        <div className="d-flex my-2">
                                            <h3 className="me-auto">Farming APY</h3>
                                            <span className="d-flex justify-content-center">
                                                <h3 className="ms-auto">72.76%</h3>
                                            </span>
                                        </div>
                                        <div className="d-flex my-2">
                                            <h3 className="me-auto">Start date</h3>
                                            <h3 className="ms-auto">30 Mar 2021 21:00 UTC</h3>
                                        </div>
                                        <div className="d-flex my-2">
                                            <h3 className="me-auto">End date</h3>
                                            <h3 className="ms-auto">14 Sep 2021 21:00 UTC</h3>
                                        </div>
                                        <div className="d-flex my-2">
                                            <h3 className="me-auto">Your stake</h3>
                                            <h3 className="ms-auto">$1564.68</h3>
                                        </div>
                                        <div className="d-flex my-2">
                                            <h3 className="me-auto">GOJI reward</h3>
                                            <h3 className="ms-auto">$0.00</h3>
                                        </div>
                                    </div>
                                    <div className="curr-btn mt-5 mb-3">
                                        <div className="d-flex">
                                            <div className="m-auto">
                                                <button className="btn theme-btn btn-green">Connect to wallet</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            
                            <div className="col-sm-4 my-3">
                                <div className="curr-item stake-item px-4 py-4">
                                    <div className="curr-header pt-3">
                                        <div className="d-flex justify-content-center align-items-center">
                                            <div className="me-auto">
                                                <img alt="" src="static/img/farming-goj-ic.svg" />
                                            </div>
                                            <div className="m-auto">
                                                <h2 className="curr-name mb-0">Farm GOJ</h2>
                                            </div>
                                            <div className="ms-auto">
                                                <img alt="" src="static/img/farming-wbtc-ic.svg" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex mt-5 mb-5">
                                        <div className="me-2">
                                            <span className="curr-x-val d-flex align-items-center justify-content-center">25X</span>
                                        </div>
                                        <div className="me-2">
                                            <span className="curr-x-farm d-flex align-items-center justify-content-center">GOJ/WBTC</span>
                                        </div>
                                    </div>

                                    <div className="curr-props mt-4">
                                        <div className="d-flex my-2">
                                            <h3 className="me-auto">Total Staked</h3>
                                            <h3 className="ms-auto">$20,485,665</h3>
                                        </div>
                                        <div className="d-flex my-2">
                                            <h3 className="me-auto">Farming APY</h3>
                                            <span className="d-flex justify-content-center">
                                                <h3 className="ms-auto">95.64%</h3>
                                            </span>
                                        </div>
                                        <div className="d-flex my-2">
                                            <h3 className="me-auto">Start date</h3>
                                            <h3 className="ms-auto">16 Feb 2021 16:25 UTC</h3>
                                        </div>
                                        <div className="d-flex my-2">
                                            <h3 className="me-auto">End date</h3>
                                            <h3 className="ms-auto">21 Aug 2021 16:25 UTC</h3>
                                        </div>
                                        <div className="d-flex my-2">
                                            <h3 className="me-auto">Your stake</h3>
                                            <h3 className="ms-auto">$586.54</h3>
                                        </div>
                                        <div className="d-flex my-2">
                                            <h3 className="me-auto">GOJI reward</h3>
                                            <h3 className="ms-auto">$0.00</h3>
                                        </div>
                                    </div>
                                    <div className="curr-btn mt-5 mb-3">
                                        <div className="d-flex">
                                            <div className="m-auto">
                                                <button className="btn theme-btn btn-green">Connect to wallet</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            
                            <div className="col-sm-4 my-3">
                                <div className="curr-item stake-item px-4 py-4">
                                    <div className="curr-header pt-3">
                                        <div className="d-flex justify-content-center align-items-center">
                                            <div className="me-auto">
                                                <img alt="" src="static/img/farming-goj-ic.svg" />
                                            </div>
                                            <div className="m-auto">
                                                <h2 className="curr-name mb-0">Farm GOJ</h2>
                                            </div>
                                            <div className="ms-auto">
                                                <img alt="" src="static/img/farming-dfyn-ic.svg" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex mt-5 mb-5">
                                        <div className="me-2">
                                            <span className="curr-x-val d-flex align-items-center justify-content-center">18X</span>
                                        </div>
                                        <div className="me-2">
                                            <span className="curr-x-farm d-flex align-items-center justify-content-center">GOJ/DFYN</span>
                                        </div>
                                    </div>

                                    <div className="curr-props mt-4">
                                        <div className="d-flex my-2">
                                            <h3 className="me-auto">Total Staked</h3>
                                            <h3 className="ms-auto">$36,598,66</h3>
                                        </div>
                                        <div className="d-flex my-2">
                                            <h3 className="me-auto">Farming APY</h3>
                                            <span className="d-flex justify-content-center">
                                                <h3 className="ms-auto">48.65%</h3>
                                            </span>
                                        </div>
                                        <div className="d-flex my-2">
                                            <h3 className="me-auto">Start date</h3>
                                            <h3 className="ms-auto">16 Feb 2021 16:25 UTC</h3>
                                        </div>
                                        <div className="d-flex my-2">
                                            <h3 className="me-auto">End date</h3>
                                            <h3 className="ms-auto">21 Aug 2021 16:25 UTC</h3>
                                        </div>
                                        <div className="d-flex my-2">
                                            <h3 className="me-auto">Your stake</h3>
                                            <h3 className="ms-auto">$586.54</h3>
                                        </div>
                                        <div className="d-flex my-2">
                                            <h3 className="me-auto">GOJI reward</h3>
                                            <h3 className="ms-auto">$0.00</h3>
                                        </div>
                                    </div>
                                    <div className="curr-btn mt-5 mb-3">
                                        <div className="d-flex">
                                            <div className="m-auto">
                                                <button className="btn theme-btn btn-green">Connect to wallet</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="col-sm-4 my-3">
                                <div className="curr-item stake-item px-4 py-4">
                                    <div className="curr-header pt-3">
                                        <div className="d-flex justify-content-center align-items-center">
                                            <div className="me-auto">
                                                <img alt="" src="static/img/farming-gaba-ic.svg" />
                                            </div>
                                            <div className="m-auto">
                                                <h2 className="curr-name mb-0">Farm GABA</h2>
                                            </div>
                                            <div className="ms-auto">
                                                <img alt="" src="static/img/farming-quickswap-ic.svg" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex mt-5 mb-5">
                                        <div className="me-2">
                                            <span className="curr-x-val d-flex align-items-center justify-content-center">15X</span>
                                        </div>
                                        <div className="me-2">
                                            <span className="curr-x-farm d-flex align-items-center justify-content-center">GABA/QUICK</span>
                                        </div>
                                    </div>

                                    <div className="curr-props mt-4">
                                        <div className="d-flex my-2">
                                            <h3 className="me-auto">Total Staked</h3>
                                            <h3 className="ms-auto">$20,485,665</h3>
                                        </div>
                                        <div className="d-flex my-2">
                                            <h3 className="me-auto">Farming APY</h3>
                                            <span className="d-flex justify-content-center">
                                                <h3 className="ms-auto">95.64%</h3>
                                            </span>
                                        </div>
                                        <div className="d-flex my-2">
                                            <h3 className="me-auto">Start date</h3>
                                            <h3 className="ms-auto">16 Feb 2021 16:25 UTC</h3>
                                        </div>
                                        <div className="d-flex my-2">
                                            <h3 className="me-auto">End date</h3>
                                            <h3 className="ms-auto">21 Aug 2021 16:25 UTC</h3>
                                        </div>
                                        <div className="d-flex my-2">
                                            <h3 className="me-auto">Your stake</h3>
                                            <h3 className="ms-auto">$186.54</h3>
                                        </div>
                                        <div className="d-flex my-2">
                                            <h3 className="me-auto">GOJI reward</h3>
                                            <h3 className="ms-auto">$0.00</h3>
                                        </div>
                                    </div>
                                    <div className="curr-btn mt-5 mb-3">
                                        <div className="d-flex">
                                            <div className="m-auto">
                                                <button className="btn theme-btn btn-green">Connect to wallet</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="col-sm-4 my-3">
                                <div className="curr-item stake-item px-4 py-4">
                                    <div className="curr-header pt-3">
                                        <div className="d-flex justify-content-center align-items-center">
                                            <div className="me-auto">
                                                <img alt="" src="static/img/farming-mia-ic.svg" />
                                            </div>
                                            <div className="m-auto">
                                                <h2 className="curr-name mb-0">Farm MIA</h2>
                                            </div>
                                            <div className="ms-auto">
                                                <img alt="" src="static/img/farming-wmatic-ic.svg" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex mt-5 mb-5">
                                        <div className="me-2">
                                            <span className="curr-x-val d-flex align-items-center justify-content-center">25X</span>
                                        </div>
                                        <div className="me-2">
                                            <span className="curr-x-farm d-flex align-items-center justify-content-center">MIA/WMETIC</span>
                                        </div>
                                    </div>

                                    <div className="curr-props mt-4">
                                        <div className="d-flex my-2">
                                            <h3 className="me-auto">Total Staked</h3>
                                            <h3 className="ms-auto">$2,682,493</h3>
                                        </div>
                                        <div className="d-flex my-2">
                                            <h3 className="me-auto">Farming APY</h3>
                                            <span className="d-flex justify-content-center">
                                                <h3 className="ms-auto">72.76%</h3>
                                            </span>
                                        </div>
                                        <div className="d-flex my-2">
                                            <h3 className="me-auto">Start date</h3>
                                            <h3 className="ms-auto">30 Mar 2021 21:00 UTC</h3>
                                        </div>
                                        <div className="d-flex my-2">
                                            <h3 className="me-auto">End date</h3>
                                            <h3 className="ms-auto">14 Sep 2021 21:00 UTC</h3>
                                        </div>
                                        <div className="d-flex my-2">
                                            <h3 className="me-auto">Your stake</h3>
                                            <h3 className="ms-auto">$1564.68</h3>
                                        </div>
                                        <div className="d-flex my-2">
                                            <h3 className="me-auto">GOJI reward</h3>
                                            <h3 className="ms-auto">$0.00</h3>
                                        </div>
                                    </div>
                                    <div className="curr-btn mt-5 mb-3">
                                        <div className="d-flex">
                                            <div className="m-auto">
                                                <button className="btn theme-btn btn-green">Connect to wallet</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="col-sm-4 my-3">
                                <div className="curr-item stake-item px-4 py-4">
                                    <div className="curr-header pt-3">
                                        <div className="d-flex justify-content-center align-items-center">
                                            <div className="me-auto">
                                                <img alt="" src="static/img/farming-hanu-ic.svg" />
                                            </div>
                                            <div className="m-auto">
                                                <h2 className="curr-name mb-0">Farm Hanu</h2>
                                            </div>
                                            <div className="ms-auto">
                                                <img alt="" src="static/img/farming-dfyn-ic.svg" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex mt-5 mb-5">
                                        <div className="me-2">
                                            <span className="curr-x-val d-flex align-items-center justify-content-center">15X</span>
                                        </div>
                                        <div className="me-2">
                                            <span className="curr-x-farm d-flex align-items-center justify-content-center">HANU/DFYN</span>
                                        </div>
                                    </div>

                                    <div className="curr-props mt-4">
                                        <div className="d-flex my-2">
                                            <h3 className="me-auto">Total Staked</h3>
                                            <h3 className="ms-auto">$36,598,63</h3>
                                        </div>
                                        <div className="d-flex my-2">
                                            <h3 className="me-auto">Farming APY</h3>
                                            <span className="d-flex justify-content-center">
                                                <h3 className="ms-auto">48.65%</h3>
                                            </span>
                                        </div>
                                        <div className="d-flex my-2">
                                            <h3 className="me-auto">Start date</h3>
                                            <h3 className="ms-auto">16 Feb 2021 16:25 UTC</h3>
                                        </div>
                                        <div className="d-flex my-2">
                                            <h3 className="me-auto">End date</h3>
                                            <h3 className="ms-auto">21 Aug 2021 16:25 UTC</h3>
                                        </div>
                                        <div className="d-flex my-2">
                                            <h3 className="me-auto">Your stake</h3>
                                            <h3 className="ms-auto">$586.54</h3>
                                        </div>
                                        <div className="d-flex my-2">
                                            <h3 className="me-auto">GOJI reward</h3>
                                            <h3 className="ms-auto">$0.00</h3>
                                        </div>
                                    </div>
                                    <div className="curr-btn mt-5 mb-3">
                                        <div className="d-flex">
                                            <div className="m-auto">
                                                <button className="btn theme-btn btn-green">Connect to wallet</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="tab-pane fade" id="ex1-tabs-2" role="tabpanel" aria-labelledby="ex1-tab-2">

                </div>
            </div>
            
            <div className="row m-0 position-relative mt-5 pt-sm-5 footer-bottom px-sm-5 py-3">
                    <div className="d-flex footer-bottom-row">
                        <div className="me-sm-auto">
                            <p className="copyright">Copyright © 2021. All Rights Reserved.</p>
                        </div>
                        <div className="ms-sm-auto">
                            <a href="" className="mx-2">
                                <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="16" cy="16.0254" r="16" fill="white" />
                                    <g clipPath="url(#clip0)">
                                        <path d="M18.3316 11.35H19.6097V9.12397C19.3892 9.09364 18.6309 9.02539 17.7477 9.02539C15.905 9.02539 14.6426 10.1845 14.6426 12.3148V14.2754H12.6091V16.7639H14.6426V23.0254H17.1358V16.7645H19.087L19.3968 14.276H17.1352V12.5616C17.1358 11.8423 17.3295 11.35 18.3316 11.35Z" fill="black" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0">
                                            <rect width="14" height="14" fill="white" transform="translate(9 9.02539)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </a>
                            <a href="" className="mx-2">
                                <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="16" cy="16.0254" r="16" fill="white" />
                                    <g clipPath="url(#clip0)">
                                        <path d="M22.9864 13.1414C22.9536 12.3976 22.8333 11.8861 22.6609 11.443C22.4832 10.9726 22.2097 10.5515 21.8514 10.2014C21.5013 9.84586 21.0774 9.56959 20.6124 9.3946C20.1667 9.22228 19.658 9.10199 18.9141 9.06919C18.1647 9.03362 17.9268 9.02539 16.026 9.02539C14.1253 9.02539 13.8873 9.03362 13.1407 9.06641C12.3968 9.09921 11.8854 9.21961 11.4424 9.39183C10.9719 9.56959 10.5508 9.84309 10.2007 10.2014C9.84513 10.5515 9.56897 10.9754 9.39387 11.4403C9.22155 11.8861 9.10126 12.3948 9.06846 13.1387C9.03288 13.8881 9.02466 14.126 9.02466 16.0268C9.02466 17.9275 9.03288 18.1654 9.06568 18.9121C9.09848 19.656 9.21888 20.1674 9.3912 20.6105C9.56897 21.0809 9.84513 21.502 10.2007 21.8521C10.5508 22.2077 10.9747 22.4839 11.4396 22.6589C11.8854 22.8312 12.394 22.9515 13.138 22.9843C13.8846 23.0172 14.1226 23.0253 16.0233 23.0253C17.9241 23.0253 18.162 23.0172 18.9087 22.9843C19.6525 22.9515 20.1639 22.8312 20.607 22.6589C21.5479 22.2951 22.2917 21.5513 22.6555 20.6105C22.8277 20.1647 22.9481 19.656 22.9809 18.9121C23.0137 18.1654 23.0219 17.9275 23.0219 16.0268C23.0219 14.126 23.0191 13.8881 22.9864 13.1414ZM21.7256 18.8574C21.6955 19.5411 21.5807 19.9103 21.4849 20.1565C21.2497 20.7664 20.7656 21.2504 20.1557 21.4857C19.9096 21.5814 19.5377 21.6962 18.8566 21.7263C18.1182 21.7592 17.8968 21.7673 16.0288 21.7673C14.1608 21.7673 13.9366 21.7592 13.2008 21.7263C12.5171 21.6962 12.1479 21.5814 11.9018 21.4857C11.5982 21.3735 11.322 21.1957 11.0977 20.9633C10.8653 20.7363 10.6875 20.4628 10.5753 20.1592C10.4796 19.9131 10.3648 19.5411 10.3347 18.8602C10.3018 18.1217 10.2937 17.9002 10.2937 16.0322C10.2937 14.1642 10.3018 13.94 10.3347 13.2044C10.3648 12.5206 10.4796 12.1514 10.5753 11.9053C10.6875 11.6017 10.8653 11.3255 11.1005 11.1011C11.3274 10.8687 11.6009 10.6909 11.9045 10.5788C12.1507 10.4831 12.5227 10.3683 13.2036 10.3381C13.942 10.3053 14.1636 10.2971 16.0315 10.2971C17.9022 10.2971 18.1237 10.3053 18.8594 10.3381C19.5431 10.3683 19.9124 10.4831 20.1585 10.5788C20.462 10.6909 20.7383 10.8687 20.9625 11.1011C21.195 11.3282 21.3728 11.6017 21.4849 11.9053C21.5807 12.1514 21.6955 12.5233 21.7256 13.2044C21.7584 13.9428 21.7666 14.1642 21.7666 16.0322C21.7666 17.9002 21.7584 18.119 21.7256 18.8574Z" fill="black" />
                                        <path d="M16.0258 12.4302C14.0404 12.4302 12.4294 14.041 12.4294 16.0266C12.4294 18.0122 14.0404 19.623 16.0258 19.623C18.0114 19.623 19.6223 18.0122 19.6223 16.0266C19.6223 14.041 18.0114 12.4302 16.0258 12.4302ZM16.0258 18.3595C14.7378 18.3595 13.6929 17.3148 13.6929 16.0266C13.6929 14.7384 14.7378 13.6937 16.0258 13.6937C17.314 13.6937 18.3587 14.7384 18.3587 16.0266C18.3587 17.3148 17.314 18.3595 16.0258 18.3595Z" fill="black" />
                                        <path d="M20.6044 12.2878C20.6044 12.7515 20.2284 13.1274 19.7646 13.1274C19.301 13.1274 18.925 12.7515 18.925 12.2878C18.925 11.8241 19.301 11.4482 19.7646 11.4482C20.2284 11.4482 20.6044 11.8241 20.6044 12.2878Z" fill="black" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0">
                                            <rect width="14" height="14" fill="white" transform="translate(9 9.02539)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </a>
                            <a href="" className="mx-2">
                                <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="16" cy="16.0254" r="16" fill="white" />
                                    <g clipPath="url(#clip0)">
                                        <path d="M23 11.6845C22.4794 11.9129 21.9246 12.0643 21.3462 12.1378C21.9412 11.7825 22.3954 11.2243 22.6089 10.5514C22.0541 10.8821 21.4416 11.1158 20.7889 11.2461C20.2621 10.6853 19.5114 10.3379 18.6924 10.3379C17.1034 10.3379 15.8241 11.6276 15.8241 13.2088C15.8241 13.4363 15.8434 13.655 15.8906 13.8633C13.5045 13.7469 11.3931 12.6033 9.97475 10.8611C9.72712 11.2908 9.58188 11.7825 9.58188 12.3119C9.58188 13.3059 10.0938 14.187 10.8568 14.6971C10.3956 14.6884 9.94325 14.5545 9.56 14.3436C9.56 14.3524 9.56 14.3638 9.56 14.3751C9.56 15.7699 10.5549 16.9284 11.8595 17.1953C11.6259 17.2591 11.3712 17.2898 11.107 17.2898C10.9232 17.2898 10.7377 17.2793 10.5636 17.2408C10.9355 18.3774 11.9908 19.213 13.2455 19.2401C12.269 20.004 11.0291 20.4643 9.68688 20.4643C9.4515 20.4643 9.22575 20.4538 9 20.4249C10.2714 21.2448 11.7781 21.7129 13.403 21.7129C18.6845 21.7129 21.572 17.3379 21.572 13.5456C21.572 13.4188 21.5676 13.2963 21.5615 13.1746C22.1311 12.7704 22.6097 12.2655 23 11.6845Z" fill="black" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0">
                                            <rect width="14" height="14" fill="white" transform="translate(9 9.02539)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
        </div>
     );
}
 
export default FarmingDark;