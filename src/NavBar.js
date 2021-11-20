import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { changeTheme, changePage } from "./redux/ducks/navReducer";

const Navbar = () => {
    const dispatch = useDispatch();
    var themeColor = useSelector((state) => state.navReducer.theme);
    var alterThemeColor = themeColor == 'light' ? 'dark' : 'light';
    const pages = useSelector((state) => state.navReducer.pages);
    const currentPage = window.location.href.split("/")[3].split("-")[0];

    if (themeColor == undefined) {
        themeColor = window.location.href.split("/")[3].split("-")[1];
        alterThemeColor = themeColor == 'light' ? 'dark' : 'light';
    }

    const chngPage = (activePage) => {
        if (activePage == undefined) {
            activePage = window.location.href.split("/")[3].split("-")[0];
            if (activePage == 'locking') {
                activePage = 'lock'
            }
        }

        const pages = {
            dao: '',
            staking: '',
            farming: '',
            lock: ''
        }
        pages[activePage] = ' active';
        dispatch(changePage(pages));
    }

    useEffect(() => {
        chngPage()
    }, [])
    
    const toggleTheme = () => {
        dispatch(changeTheme(alterThemeColor));
        localStorage.setItem("theme", alterThemeColor);
    }

    return ( 
        <div>
            <div className="nav-overlay">
                <Link onClick={() => chngPage('dao')} to={`/dao-${themeColor}`} className="overlay-logo">
                    <img src="static/img/mobile-logo.svg" />
                </Link>

                <a className="position-absolute close-menu" href="#">
                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3" y="0.213196" width="30" height="3" transform="rotate(45 3 0.213196)" fill="white" />
                        <rect x="1" y="21.2132" width="30" height="3" transform="rotate(-45 1 21.2132)" fill="white" />
                    </svg>
                </a>
                <div className="nav-wrapper d-flex align-items-end">
                    <div className="d-flex flex-column m-auto">
                        <Link onClick={() => chngPage('staking')} to={`/staking-${themeColor}`} className={`d-block menu-a text-white${pages.staking}`}>Goji Staking</Link>
                        <Link onClick={() => chngPage('farming')} to={`/farming-${themeColor}`} className={`d-block menu-a text-white${pages.farming}`}>Goji Farming</Link>
                        <Link onClick={() => chngPage('lock')} to={`/locking-${themeColor}`} className={`d-block menu-a text-white${pages.lock}`}>Goji Lock</Link>
                        <Link onClick={() => chngPage('dao')} to={`/dao-${themeColor}`} className={`d-block menu-a text-white${pages.dao}`}>Goji Dao</Link>
                    </div>
                </div>
            </div>

            <div className="header">
                <div className="header-content position-relative">
                    <div className="main-nav">
                        <nav className="container-fluid navbar navbar-expand-lg navbar-dark w-100 main-nav d-flex p-sm-5 navbar-row" id="navbar">
                            <Link onClick={() => chngPage('dao')} className="navbar-brand header-logo me-auto" to={`/dao-${themeColor}`}>
                                <svg width="150" height="48" viewBox="0 0 150 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path className="p" d="M64.6622 27.7601C64.0563 28.2749 63.3815 28.6696 62.6374 28.9455C61.8917 29.2204 61.1168 29.3586 60.3116 29.3586C59.6945 29.3586 59.0994 29.278 58.5268 29.1169C57.9543 28.9578 57.4204 28.7301 56.9241 28.4359C56.4267 28.1427 55.9734 27.7916 55.5618 27.3829C55.1495 26.9742 54.7987 26.5196 54.5078 26.0206C54.2173 25.5209 53.9914 24.9834 53.831 24.4082C53.6706 23.8331 53.5903 23.2361 53.5903 22.619C53.5903 22.0019 53.6709 21.4083 53.831 20.8394C53.9912 20.2695 54.217 19.7348 54.5078 19.2359C54.7987 18.7369 55.1495 18.2826 55.5618 17.8736C55.9734 17.4649 56.4267 17.1157 56.9241 16.8241C57.4204 16.5343 57.9543 16.3084 58.5268 16.1483C59.0994 15.9881 59.6948 15.9075 60.3116 15.9075C61.1171 15.9075 61.8917 16.0458 62.6374 16.3207C63.3815 16.5956 64.0563 16.9912 64.6622 17.5058L63.3001 19.7766C62.9063 19.3765 62.452 19.064 61.9371 18.8366C61.4233 18.6089 60.8805 18.4951 60.3114 18.4951C59.7425 18.4951 59.2076 18.6044 58.7086 18.8225C58.2086 19.0413 57.771 19.3355 57.3957 19.7082C57.0209 20.0794 56.724 20.5155 56.5063 21.016C56.2882 21.5149 56.1789 22.0499 56.1789 22.619C56.1789 23.1941 56.2882 23.7332 56.5063 24.2358C56.724 24.7382 57.0211 25.1777 57.3957 25.5525C57.771 25.9286 58.2089 26.2246 58.7086 26.4427C59.2076 26.6607 59.7425 26.77 60.3114 26.77C60.6379 26.77 60.9567 26.7309 61.2647 26.6518C61.5746 26.5731 61.868 26.4646 62.146 26.3245V22.619H64.6619V27.7601H64.6622Z" fill="white" />
                                    <path className="p" d="M75.8066 24.1266C75.8066 24.854 75.6762 25.5298 75.4154 26.1565C75.1546 26.7833 74.8009 27.325 74.3536 27.783C73.9055 28.24 73.3794 28.6007 72.7772 28.8633C72.1749 29.1276 71.5289 29.259 70.839 29.259C70.1535 29.259 69.5111 29.1276 68.9079 28.8633C68.3056 28.6007 67.7785 28.24 67.3278 27.783C66.8761 27.325 66.5216 26.7833 66.2608 26.1565C66.0007 25.5298 65.8703 24.854 65.8703 24.1266C65.8703 23.3887 66.0007 22.704 66.2608 22.0739C66.5216 21.4445 66.8761 20.9007 67.3278 20.4437C67.7788 19.9868 68.3056 19.6279 68.9079 19.3671C69.5111 19.1078 70.1535 18.9766 70.839 18.9766C71.5289 18.9766 72.1749 19.0992 72.7772 19.3444C73.3794 19.5893 73.9055 19.9388 74.3536 20.3895C74.8009 20.8405 75.1546 21.3822 75.4154 22.016C75.6762 22.648 75.8066 23.3519 75.8066 24.1266ZM73.309 24.1266C73.309 23.7275 73.2435 23.3657 73.1131 23.0421C72.9827 22.7181 72.8058 22.4398 72.5826 22.2061C72.3578 21.9724 72.0959 21.7938 71.7965 21.6694C71.497 21.546 71.1775 21.4839 70.8387 21.4839C70.4981 21.4839 70.1796 21.546 69.8794 21.6694C69.58 21.7938 69.32 21.9722 69.0985 22.2061C68.8779 22.4398 68.7036 22.7181 68.5769 23.0421C68.4491 23.366 68.386 23.7275 68.386 24.1266C68.386 24.5019 68.4491 24.8503 68.5769 25.1719C68.7036 25.493 68.8779 25.7705 69.0985 26.0068C69.32 26.2431 69.58 26.4296 69.8794 26.5655C70.1796 26.7019 70.4984 26.7702 70.8387 26.7702C71.1775 26.7702 71.497 26.7063 71.7965 26.5796C72.0956 26.4528 72.3575 26.2742 72.5826 26.0439C72.8058 25.8136 72.9827 25.5352 73.1131 25.2079C73.2435 24.8801 73.309 24.5212 73.309 24.1266Z" fill="white" />
                                    <path className="p" d="M73.4816 32.7822V30.2848L74.8524 30.3023C75.186 30.3023 75.4951 30.234 75.7786 30.0991C76.0637 29.9627 76.3104 29.7804 76.5188 29.553C76.7272 29.3271 76.8936 29.0645 77.0141 28.7676C77.1352 28.4708 77.1962 28.1591 77.1962 27.8318V19.3494H79.7296V27.8318H79.7121C79.7053 28.2869 79.6437 28.7257 79.5248 29.1503C79.4074 29.5731 79.2395 29.9679 79.0204 30.3354C78.8034 30.7003 78.5426 31.0342 78.2397 31.3333C77.9369 31.6336 77.6041 31.891 77.2364 32.1054C76.8707 32.3208 76.4766 32.4872 76.0548 32.6054C75.6352 32.7235 75.1973 32.7822 74.7439 32.7822H73.4816ZM80.1375 16.7067C80.1375 16.937 80.0937 17.1514 80.006 17.3509C79.9186 17.5515 79.8013 17.7247 79.6526 17.8734C79.5039 18.0223 79.3287 18.1397 79.1255 18.227C78.9223 18.3155 78.7087 18.3593 78.4846 18.3593C78.2483 18.3593 78.0295 18.3155 77.8266 18.227C77.6234 18.1397 77.4466 18.0223 77.2961 17.8734C77.1438 17.7247 77.0248 17.5513 76.9372 17.3509C76.8496 17.1514 76.8039 16.937 76.8039 16.7067C76.8039 16.4816 76.8496 16.2698 76.9372 16.0659C77.0248 15.8637 77.1438 15.6887 77.2961 15.5388C77.4466 15.3909 77.6234 15.2735 77.8266 15.1843C78.0295 15.0967 78.2483 15.0531 78.4846 15.0531C78.7087 15.0531 78.9223 15.0967 79.1255 15.1843C79.3284 15.2735 79.5037 15.3909 79.6526 15.5388C79.8013 15.6885 79.9189 15.8637 80.006 16.0659C80.0937 16.2701 80.1375 16.4819 80.1375 16.7067Z" fill="white" />
                                    <path className="p" d="M84.5248 16.7067C84.5248 16.937 84.481 17.1514 84.3933 17.3509C84.306 17.5515 84.1868 17.7247 84.0345 17.8734C83.8821 18.0223 83.7053 18.1397 83.5042 18.227C83.301 18.3155 83.084 18.3593 82.8548 18.3593C82.6234 18.3593 82.4064 18.3155 82.205 18.227C82.0021 18.1397 81.8253 18.0223 81.6782 17.8734C81.5293 17.7247 81.4119 17.5513 81.3227 17.3509C81.2351 17.1514 81.1915 16.937 81.1915 16.7067C81.1915 16.4816 81.2351 16.2698 81.3227 16.0659C81.4122 15.8637 81.5293 15.6887 81.6782 15.5388C81.825 15.3909 82.0019 15.2735 82.205 15.1843C82.4064 15.0967 82.6234 15.0531 82.8548 15.0531C83.084 15.0531 83.301 15.0967 83.5042 15.1843C83.7053 15.2735 83.8821 15.3909 84.0345 15.5388C84.1868 15.6885 84.306 15.8637 84.3933 16.0659C84.481 16.2701 84.5248 16.4819 84.5248 16.7067ZM84.0978 29.0767H81.6012V19.3496H84.0978V29.0767Z" fill="white" />
                                    <path className="p" d="M101.854 27.741C101.248 28.2627 100.571 28.6617 99.8197 28.9403C99.0685 29.2193 98.2912 29.3586 97.4858 29.3586C96.8679 29.3586 96.2727 29.278 95.7 29.1168C95.1275 28.9577 94.5917 28.73 94.0928 28.4358C93.5938 28.1427 93.1387 27.7898 92.7274 27.3785C92.314 26.9669 91.9621 26.511 91.6679 26.0112C91.3737 25.5123 91.1481 24.9763 90.9869 24.4041C90.826 23.8315 90.7472 23.2361 90.7472 22.619C90.7472 22.0019 90.826 21.4049 90.9869 20.8305C91.1481 20.2546 91.3737 19.7171 91.6679 19.2171C91.9621 18.7181 92.314 18.262 92.7274 17.8506C93.1387 17.4391 93.5938 17.0854 94.0928 16.7922C94.5917 16.4991 95.1275 16.2714 95.7 16.1112C96.2725 15.9511 96.8679 15.8705 97.4858 15.8705C98.2912 15.8705 99.0685 16.0087 99.8197 16.2836C100.571 16.5585 101.248 16.9602 101.854 17.4873L100.474 19.7573C100.093 19.3459 99.641 19.0306 99.1212 18.8084C98.5995 18.5877 98.0549 18.4774 97.4858 18.4774C96.9099 18.4774 96.3721 18.5859 95.8682 18.8047C95.3656 19.0217 94.9282 19.3178 94.5516 19.6905C94.1768 20.0616 93.8792 20.5011 93.6622 21.0071C93.4433 21.5123 93.3348 22.0496 93.3348 22.6187C93.3348 23.1878 93.4433 23.7225 93.6622 24.2217C93.8792 24.7215 94.177 25.1584 94.5516 25.5347C94.9279 25.9095 95.3656 26.2069 95.8682 26.4241C96.3724 26.643 96.9099 26.7515 97.4858 26.7515C98.0549 26.7515 98.5995 26.6411 99.1212 26.4197C99.641 26.199 100.093 25.8832 100.474 25.4708L101.854 27.741Z" fill="white" />
                                    <path className="p" d="M105.578 29.0767H103.099V19.3496H103.697L104.515 20.5032C104.914 20.1391 105.369 19.8598 105.877 19.6628C106.387 19.4659 106.914 19.3671 107.458 19.3671H109.647V21.8373H107.458C107.198 21.8373 106.952 21.8863 106.723 21.9826C106.492 22.0806 106.292 22.2137 106.122 22.3835C105.954 22.5517 105.82 22.752 105.723 22.982C105.627 23.2124 105.578 23.4583 105.578 23.7173V29.0767H105.578Z" fill="white" />
                                    <path className="p" d="M113.071 32.7822V30.2848L114.453 30.3023C114.694 30.3023 114.927 30.2637 115.151 30.1849C115.375 30.1062 115.582 29.9966 115.774 29.8576C115.965 29.7183 116.132 29.553 116.277 29.3636C116.423 29.1729 116.541 28.9645 116.632 28.7402C116.359 28.8558 116.083 28.9705 115.801 29.0853C115.519 29.2006 115.237 29.2585 114.951 29.2585C114.351 29.2585 113.789 29.1518 113.262 28.9398C112.735 28.7288 112.273 28.4267 111.877 28.0363C111.48 27.6458 111.168 27.1706 110.94 26.6104C110.714 26.0509 110.6 25.4223 110.6 24.7264V19.3488H113.071V24.7264C113.071 25.0713 113.12 25.3717 113.221 25.6299C113.321 25.8863 113.456 26.1018 113.624 26.2742C113.794 26.4466 113.993 26.5762 114.219 26.6602C114.447 26.7457 114.69 26.7877 114.951 26.7877C115.205 26.7877 115.447 26.7283 115.673 26.6101C115.9 26.4919 116.098 26.336 116.268 26.1424C116.438 25.9492 116.571 25.7293 116.667 25.4836C116.765 25.2392 116.812 24.9862 116.812 24.7264V19.3488H119.311V27.8506C119.304 28.5342 119.172 29.1758 118.912 29.7765C118.651 30.3751 118.295 30.8988 117.843 31.3469C117.392 31.7952 116.868 32.1487 116.268 32.4095C115.669 32.6706 115.026 32.7999 114.342 32.7999L113.071 32.7822Z" fill="white" />
                                    <path className="p" d="M123.698 32.7822H121.2V19.3496H121.799L122.79 20.5209C123.014 20.3091 123.259 20.1094 123.525 19.9221C123.791 19.734 124.069 19.5721 124.356 19.4354C124.644 19.2987 124.943 19.192 125.251 19.1133C125.559 19.0345 125.871 18.9959 126.186 18.9959C126.871 18.9959 127.513 19.1185 128.115 19.3637C128.719 19.6088 129.246 19.9555 129.696 20.4036C130.148 20.8509 130.504 21.391 130.764 22.0248C131.023 22.6568 131.155 23.3579 131.155 24.1265C131.155 24.9257 131.023 25.6453 130.764 26.2835C130.504 26.9236 130.148 27.4645 129.696 27.909C129.246 28.3547 128.72 28.6954 128.115 28.9317C127.513 29.168 126.871 29.2851 126.186 29.2851C125.969 29.2851 125.752 29.2613 125.536 29.2134C125.321 29.1643 125.109 29.0996 124.901 29.0172C124.692 28.9366 124.486 28.844 124.283 28.7405C124.08 28.638 123.886 28.5321 123.698 28.4218V32.7822ZM128.665 24.1265C128.665 23.716 128.6 23.3456 128.471 23.0191C128.341 22.6918 128.163 22.415 127.939 22.1876C127.715 21.9602 127.452 21.7867 127.149 21.6659C126.846 21.5441 126.526 21.4839 126.186 21.4839C125.847 21.4839 125.528 21.5441 125.229 21.6659C124.929 21.7867 124.667 21.9599 124.443 22.1876C124.219 22.4153 124.041 22.6918 123.912 23.0191C123.781 23.3456 123.716 23.716 123.716 24.1265C123.716 24.5214 123.781 24.8803 123.912 25.2079C124.041 25.5352 124.219 25.8135 124.443 26.0438C124.666 26.2741 124.929 26.4525 125.229 26.5796C125.528 26.7063 125.847 26.7702 126.186 26.7702C126.526 26.7702 126.846 26.7063 127.149 26.5796C127.452 26.4528 127.715 26.2741 127.939 26.0438C128.163 25.8135 128.341 25.5352 128.471 25.2079C128.6 24.8801 128.665 24.5212 128.665 24.1265Z" fill="white" />
                                    <path className="p" d="M137.33 29.0767C136.731 29.0767 136.167 28.9627 135.642 28.7371C135.115 28.5094 134.652 28.198 134.255 27.8002C133.859 27.4046 133.548 26.9424 133.32 26.4153C133.093 25.8881 132.979 25.3255 132.979 24.7267V21.8371H131.771V19.3668H132.979V15.48H135.449V19.3668H139.21V21.8371H135.449V24.7267C135.449 24.9865 135.498 25.2301 135.596 25.4575C135.692 25.6844 135.825 25.8832 135.995 26.0519C136.165 26.2217 136.363 26.3566 136.594 26.4565C136.823 26.5564 137.07 26.6062 137.329 26.6062H139.21V29.0764H137.33V29.0767Z" fill="white" />
                                    <path className="p" d="M150 24.1266C150 24.854 149.87 25.5298 149.61 26.1565C149.349 26.7833 148.995 27.325 148.547 27.783C148.099 28.24 147.574 28.6007 146.971 28.8633C146.369 29.1276 145.723 29.259 145.033 29.259C144.348 29.259 143.704 29.1276 143.102 28.8633C142.5 28.6007 141.973 28.24 141.523 27.783C141.071 27.325 140.714 26.7833 140.455 26.1565C140.194 25.5298 140.064 24.854 140.064 24.1266C140.064 23.3887 140.194 22.704 140.455 22.0739C140.714 21.4445 141.071 20.9007 141.523 20.4437C141.973 19.9868 142.5 19.6279 143.102 19.3671C143.705 19.1078 144.348 18.9766 145.033 18.9766C145.723 18.9766 146.369 19.0992 146.971 19.3444C147.574 19.5893 148.099 19.9388 148.547 20.3895C148.995 20.8405 149.349 21.3822 149.61 22.016C149.87 22.648 150 23.3519 150 24.1266ZM147.501 24.1266C147.501 23.7275 147.437 23.3657 147.307 23.0421C147.178 22.7181 147.001 22.4398 146.775 22.2061C146.552 21.9724 146.29 21.7938 145.99 21.6694C145.691 21.546 145.371 21.4839 145.033 21.4839C144.693 21.4839 144.373 21.546 144.073 21.6694C143.774 21.7938 143.513 21.9722 143.292 22.2061C143.072 22.4398 142.899 22.7181 142.771 23.0421C142.643 23.366 142.58 23.7275 142.58 24.1266C142.58 24.5019 142.643 24.8503 142.771 25.1719C142.899 25.493 143.072 25.7705 143.292 26.0068C143.513 26.2431 143.774 26.4296 144.073 26.5655C144.372 26.7019 144.693 26.7702 145.033 26.7702C145.371 26.7702 145.691 26.7063 145.99 26.5796C146.29 26.4528 146.552 26.2742 146.775 26.0439C147.001 25.8136 147.178 25.5352 147.307 25.2079C147.437 24.8801 147.501 24.5212 147.501 24.1266Z" fill="white" />
                                    <path d="M23.9453 0C10.7414 0 0 10.742 0 23.9442C0 37.1476 10.7414 47.8895 23.9453 47.8895C37.1489 47.8895 47.89 37.1476 47.89 23.9442C47.89 10.7417 37.1489 0 23.9453 0ZM26.4523 16.1824C22.8532 17.8561 20.0786 21.0126 18.9203 24.8631C17.9795 24.4221 17.1081 23.8584 16.323 23.1939C17.3992 19.431 19.8728 16.2975 23.0603 14.1744C24.0577 13.5101 25.3136 12.8794 26.1891 12.634C27.8714 12.0341 29.6768 11.69 31.5636 11.69C31.6445 11.69 31.7253 11.6932 31.807 11.6937C32.9251 11.6932 34.1327 11.8087 35.3795 12.1084C35.5023 12.1384 35.6249 12.1697 35.7485 12.2031C35.7655 12.2075 35.7835 12.2117 35.8015 12.2166C36.0808 12.2928 36.3601 12.3789 36.6424 12.4756C36.6862 12.49 36.7321 12.5069 36.7762 12.5226C36.8687 12.5554 36.9616 12.5888 37.0552 12.6238C37.2996 12.7161 37.544 12.8157 37.7892 12.925C37.7881 12.9008 37.7853 12.877 37.7832 12.8533C37.7853 12.8549 37.7874 12.8554 37.7892 12.8554C37.6215 10.7232 36.7201 8.66372 36.1504 7.55054C35.7138 6.75268 35.199 6.00203 34.6197 5.30799C41.0664 9.01505 45.4198 15.9701 45.4268 23.9239C43.418 18.6459 38.308 14.8841 32.3325 14.8841C31.1766 14.8841 30.0537 15.0262 28.9786 15.2915C28.1682 15.4907 27.3219 15.8009 26.4523 16.1824ZM39.0915 19.3514C38.3844 22.2098 36.9144 24.769 34.9027 26.7953C34.4937 23.2118 33.0485 19.9385 30.8753 17.2836C31.3531 17.2242 31.8398 17.1923 32.3323 17.1923C34.8497 17.1921 37.1804 17.9936 39.0915 19.3514ZM23.8887 20.8086C25.1675 22.1511 26.131 23.7953 26.6537 25.6252C25.7601 25.8456 24.8284 25.9648 23.8683 25.9648C22.9148 25.9648 21.9889 25.8477 21.1013 25.6318C21.6334 23.7984 22.6039 22.1513 23.8887 20.8086ZM14.5179 21.2862C13.0447 19.33 12.1705 16.8994 12.1705 14.2675C12.1705 14.0043 12.183 13.744 12.1994 13.485C13.6196 13.0706 15.1196 12.8437 16.672 12.8437C17.937 12.8437 19.1662 12.9955 20.3472 13.274C17.7288 15.3366 15.6908 18.1037 14.5179 21.2862ZM23.8683 2.57118C28.6742 2.57118 32.8083 5.48587 34.6035 9.63998C33.616 9.47149 32.5999 9.38124 31.5636 9.38124C28.41 9.38124 25.4429 10.1906 22.855 11.6108C20.9226 10.9159 18.8413 10.5354 16.672 10.5354C15.2876 10.5354 13.9391 10.6945 12.6418 10.9882C14.064 6.12984 18.5567 2.57118 23.8683 2.57118ZM12.9686 5.48561C11.0273 7.89013 9.86168 10.9449 9.86168 14.2675C9.86168 21.9909 16.1444 28.2736 23.8683 28.2736C24.9672 28.2736 26.0342 28.1429 27.0605 27.9014C27.0832 28.2027 27.0994 28.5052 27.0994 28.8114C27.0994 29.6891 26.9987 30.5446 26.813 31.3672C26.1628 31.4267 25.5355 31.4614 24.9281 31.476C24.4641 31.5177 23.9956 31.5443 23.5209 31.5443C21.1357 31.5443 18.8723 31.0196 16.8358 30.0814C14.6157 29.1255 12.9222 27.7629 11.6303 26.253C9.43654 23.8295 7.97202 20.7361 7.5847 17.3201C7.30979 17.5202 7.05236 17.7242 6.80328 17.9294C4.87346 19.4709 3.36043 21.5129 2.46372 23.8571C2.49528 16.0562 6.70651 9.22345 12.9686 5.48561ZM26.0303 33.6737C24.9401 36.0289 23.0864 37.9577 20.7857 39.1452C18.8353 37.3322 17.3374 35.0399 16.492 32.4502C18.6582 33.3526 21.0324 33.8529 23.5214 33.8529C24.373 33.8529 25.2095 33.7882 26.0303 33.6737ZM3.85912 28.8117C3.85912 26.1534 4.7587 23.7004 6.26807 21.7411C7.66686 25.5968 10.3218 28.8553 13.7388 31.0175C14.413 34.4814 16.0776 37.5938 18.4219 40.0539C17.4818 40.3006 16.4959 40.4324 15.4798 40.4324C9.07243 40.4321 3.85912 35.2196 3.85912 28.8117ZM23.9453 45.4258C20.0447 45.4258 16.3838 44.3807 13.2273 42.5565C13.961 42.6762 14.7124 42.7412 15.4798 42.7412C23.1599 42.7412 29.4085 36.4924 29.4085 28.8117C29.4085 25.1365 27.9734 21.794 25.6396 19.3027C26.4685 18.7215 27.3759 18.2461 28.3422 17.894C30.2134 19.8793 31.5848 22.3386 32.2538 25.0728L32.2689 25.0577C32.2817 25.1099 32.2937 25.1649 32.3067 25.2217C32.3338 25.3675 32.3615 25.5139 32.3855 25.6581C32.5112 26.2697 32.5978 26.8944 32.6507 27.5287C32.7245 28.2097 32.7655 28.9429 32.7485 29.7097C32.7525 29.7097 32.7556 29.7107 32.7584 29.7107C32.7525 30.0099 32.7355 30.3146 32.7107 30.6234C32.7068 30.6244 32.7037 30.6254 32.6998 30.6254C32.5743 32.1348 32.2011 33.7266 31.4212 35.2506C30.5477 37.3101 29.349 38.8862 28.2648 40.0143C28.2329 40.0466 28.2019 40.0797 28.1709 40.111C28.0621 40.2224 27.9565 40.3286 27.8508 40.4298C27.8219 40.4569 27.794 40.4843 27.7661 40.5111C27.6743 40.599 27.5824 40.6838 27.4938 40.7641C27.4737 40.7826 27.4539 40.8022 27.4348 40.8192C27.3292 40.9131 27.2275 41.0025 27.1286 41.087C27.1077 41.1045 27.0877 41.1214 27.0678 41.1381C26.8555 41.3171 26.6581 41.4746 26.4815 41.6092L26.4953 41.6152C26.4953 41.6152 27.4259 42.1178 28.9758 42.496C28.9797 42.4918 28.9846 42.4874 28.9885 42.4845C30.0608 42.7487 31.1797 42.8948 32.3325 42.8948C33.0057 42.8948 33.6669 42.8444 34.3143 42.7516C31.2384 44.455 27.7029 45.4258 23.9453 45.4258ZM32.3325 40.5857C31.8409 40.5857 31.3542 40.5534 30.8774 40.4934C33.2879 37.5492 34.8038 33.8471 35.0033 29.8028C37.7858 27.5639 39.9013 24.5316 41.0093 21.0533C42.8851 23.1289 44.0301 25.8769 44.0301 28.8889C44.0304 35.3388 38.7832 40.5857 32.3325 40.5857Z" fill="url(#paint0_linear)" />
                                    <defs>
                                        <linearGradient id="paint0_linear" x1="10.1546" y1="4.37967" x2="37.9308" y2="43.7863" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#8DC33F" />
                                            <stop offset="1" stopColor="#00A7A7" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </Link>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav m-auto mb-2 mb-lg-0 justify-content-center h-100">
                                    <li className="nav-item mx-sm-3">
                                        <Link onClick={() => chngPage('staking')} className={`nav-link d-flex${pages['staking']}`} aria-current="page" to={`/staking-${themeColor}`}>Goji Staking</Link>
                                    </li>
                                    <li className="nav-item mx-sm-3">
                                        <Link onClick={() => chngPage('farming')} className={`nav-link d-flex${pages['farming']}`} aria-current="page" to={`/farming-${themeColor}`}>Goji Farming</Link>
                                    </li>
                                    <li className="nav-item mx-sm-3">
                                        <Link onClick={() => chngPage('lock')} className={`nav-link d-flex${pages['lock']}`} aria-current="page" to={`/locking-${themeColor}`}>Goji Lock</Link>
                                    </li>
                                    <li className="nav-item mx-sm-3">
                                        <Link onClick={() => chngPage('dao')} className={`nav-link d-flex${pages['dao']}`} aria-current="page" to={`/dao-${themeColor}`}>Goji Dao</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="d-flex w-auto d-none d-sm-flex">
                                <Link to={`/${currentPage}-${alterThemeColor}`} className="me-3 theme-toggle d-flex align-items-center" onClick={toggleTheme}>
                                    <svg width="69" height="24" viewBox="0 0 69 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.66002 4.20002L6.05002 4.59002C6.44002 4.97002 6.44002 5.61002 6.05002 5.99002L6.04002 6.00002C5.65002 6.39002 5.03002 6.39002 4.64002 6.00002L4.25002 5.61002C3.86002 5.23002 3.86002 4.60002 4.25002 4.21002L4.26002 4.20002C4.64002 3.82002 5.27002 3.81002 5.66002 4.20002Z" fill="white" />
                                        <path d="M1.99 10.95H3.01C3.56 10.95 4 11.39 4 11.95V11.96C4 12.51 3.56 12.95 3 12.94H1.99C1.44 12.94 1 12.5 1 11.95V11.94C1 11.39 1.44 10.95 1.99 10.95Z" fill="white" />
                                        <path d="M12 1H12.01C12.56 1 13 1.44 13 1.99V2.96C13 3.51 12.56 3.95 12 3.94H11.99C11.44 3.94 11 3.5 11 2.95V1.99C11 1.44 11.44 1 12 1Z" fill="white" />
                                        <path d="M18.3402 4.20002C18.7302 3.82002 19.3602 3.82002 19.7502 4.21002C20.1402 4.60002 20.1402 5.22002 19.7502 5.61002L19.3602 6.00002C18.9802 6.39002 18.3502 6.39002 17.9602 6.00002L17.9502 5.99002C17.5602 5.61002 17.5602 4.98002 17.9502 4.59002L18.3402 4.20002Z" fill="white" />
                                        <path d="M18.3302 19.7L17.9402 19.31C17.5502 18.92 17.5502 18.3 17.9502 17.9C18.3302 17.52 18.9602 17.51 19.3502 17.9L19.7402 18.29C20.1302 18.68 20.1302 19.31 19.7402 19.7C19.3502 20.09 18.7202 20.09 18.3302 19.7Z" fill="white" />
                                        <path d="M20 11.95V11.94C20 11.39 20.44 10.95 20.99 10.95H22C22.55 10.95 22.99 11.39 22.99 11.94V11.95C22.99 12.5 22.55 12.94 22 12.94H20.99C20.44 12.94 20 12.5 20 11.95Z" fill="white" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M6 11.95C6 8.63995 8.69 5.94995 12 5.94995C15.31 5.94995 18 8.63995 18 11.95C18 15.26 15.31 17.95 12 17.95C8.69 17.95 6 15.26 6 11.95ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79081 14.2091 7.99995 12 7.99995C9.79086 7.99995 8 9.79081 8 12C8 14.2091 9.79086 16 12 16Z" fill="white" />
                                        <path d="M12 22.9H11.99C11.44 22.9 11 22.46 11 21.91V20.95C11 20.4 11.44 19.96 11.99 19.96H12C12.55 19.96 12.99 20.4 12.99 20.95V21.91C12.99 22.46 12.55 22.9 12 22.9Z" fill="white" />
                                        <path d="M5.65982 19.69C5.26982 20.08 4.63982 20.08 4.24982 19.69C3.85982 19.3 3.85982 18.68 4.23982 18.28L4.62982 17.89C5.01982 17.5 5.64982 17.5 6.03982 17.89L6.04982 17.9C6.42982 18.28 6.43982 18.91 6.04982 19.3L5.65982 19.69Z" fill="white" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M49.1532 13.5796L49.1534 13.5807C49.773 16.782 52.4218 19.3384 55.6468 19.856L55.65 19.8565C58.041 20.2443 60.2623 19.581 61.942 18.254C56.3547 16.2585 52.9746 10.3231 54.2624 4.45887C50.6982 5.74265 48.3579 9.48316 49.1532 13.5796ZM55.0081 2.18125C49.766 3.22401 46.0987 8.34018 47.1898 13.9608C47.9698 17.9908 51.2798 21.1808 55.3299 21.8308C58.851 22.4018 62.0953 21.1315 64.266 18.8294C64.2763 18.8185 64.2864 18.8077 64.2966 18.7968C64.4383 18.6452 64.5755 18.4891 64.7077 18.3288C64.7103 18.3257 64.7128 18.3226 64.7154 18.3194C64.8851 18.1133 65.0467 17.9002 65.1999 17.6808C65.4099 17.3708 65.2399 16.9308 64.8699 16.8908C64.5112 16.8503 64.16 16.7916 63.8168 16.7159C63.7962 16.7113 63.7756 16.7067 63.755 16.702C63.6674 16.6821 63.5802 16.661 63.4936 16.6388C63.4917 16.6383 63.4899 16.6379 63.488 16.6374C58.0232 15.2354 54.7249 9.45077 56.454 4.00488C56.4547 4.00285 56.4553 4.00083 56.456 3.99881C56.4873 3.90025 56.5203 3.8018 56.555 3.70349C56.5563 3.69982 56.5576 3.69614 56.5589 3.69246C56.6766 3.35992 56.8134 3.029 56.9699 2.70076C57.1299 2.36076 56.8499 1.98076 56.4699 2.00076C56.1952 2.0145 55.9238 2.03919 55.6559 2.07439C55.6515 2.07498 55.647 2.07557 55.6426 2.07616C55.4411 2.10292 55.2416 2.13563 55.0444 2.17411C55.0323 2.17647 55.0202 2.17885 55.0081 2.18125Z" fill="white" />
                                        <line x1="34.5" y1="3" x2="34.5" y2="21" stroke="white" />
                                    </svg>
                                </Link>
                                <a className="m-0" href="#">
                                    <button className="btn theme-btn m-0 top-btn">Get started</button>
                                </a>
                            </div>

                            <div className="mobile-nav-btns align-items-center mobile">
                                <Link className="theme-toggler" to={`/${currentPage}-${alterThemeColor}`} onClick={toggleTheme}>
                                    <svg width="69" height="24" viewBox="0 0 69 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.66002 4.20002L6.05002 4.59002C6.44002 4.97002 6.44002 5.61002 6.05002 5.99002L6.04002 6.00002C5.65002 6.39002 5.03002 6.39002 4.64002 6.00002L4.25002 5.61002C3.86002 5.23002 3.86002 4.60002 4.25002 4.21002L4.26002 4.20002C4.64002 3.82002 5.27002 3.81002 5.66002 4.20002Z" fill="white" />
                                        <path d="M1.99 10.95H3.01C3.56 10.95 4 11.39 4 11.95V11.96C4 12.51 3.56 12.95 3 12.94H1.99C1.44 12.94 1 12.5 1 11.95V11.94C1 11.39 1.44 10.95 1.99 10.95Z" fill="white" />
                                        <path d="M12 1H12.01C12.56 1 13 1.44 13 1.99V2.96C13 3.51 12.56 3.95 12 3.94H11.99C11.44 3.94 11 3.5 11 2.95V1.99C11 1.44 11.44 1 12 1Z" fill="white" />
                                        <path d="M18.3402 4.20002C18.7302 3.82002 19.3602 3.82002 19.7502 4.21002C20.1402 4.60002 20.1402 5.22002 19.7502 5.61002L19.3602 6.00002C18.9802 6.39002 18.3502 6.39002 17.9602 6.00002L17.9502 5.99002C17.5602 5.61002 17.5602 4.98002 17.9502 4.59002L18.3402 4.20002Z" fill="white" />
                                        <path d="M18.3302 19.7L17.9402 19.31C17.5502 18.92 17.5502 18.3 17.9502 17.9C18.3302 17.52 18.9602 17.51 19.3502 17.9L19.7402 18.29C20.1302 18.68 20.1302 19.31 19.7402 19.7C19.3502 20.09 18.7202 20.09 18.3302 19.7Z" fill="white" />
                                        <path d="M20 11.95V11.94C20 11.39 20.44 10.95 20.99 10.95H22C22.55 10.95 22.99 11.39 22.99 11.94V11.95C22.99 12.5 22.55 12.94 22 12.94H20.99C20.44 12.94 20 12.5 20 11.95Z" fill="white" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M6 11.95C6 8.63995 8.69 5.94995 12 5.94995C15.31 5.94995 18 8.63995 18 11.95C18 15.26 15.31 17.95 12 17.95C8.69 17.95 6 15.26 6 11.95ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79081 14.2091 7.99995 12 7.99995C9.79086 7.99995 8 9.79081 8 12C8 14.2091 9.79086 16 12 16Z" fill="white" />
                                        <path d="M12 22.9H11.99C11.44 22.9 11 22.46 11 21.91V20.95C11 20.4 11.44 19.96 11.99 19.96H12C12.55 19.96 12.99 20.4 12.99 20.95V21.91C12.99 22.46 12.55 22.9 12 22.9Z" fill="white" />
                                        <path d="M5.65982 19.69C5.26982 20.08 4.63982 20.08 4.24982 19.69C3.85982 19.3 3.85982 18.68 4.23982 18.28L4.62982 17.89C5.01982 17.5 5.64982 17.5 6.03982 17.89L6.04982 17.9C6.42982 18.28 6.43982 18.91 6.04982 19.3L5.65982 19.69Z" fill="white" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M49.1532 13.5796L49.1534 13.5807C49.773 16.782 52.4218 19.3384 55.6468 19.856L55.65 19.8565C58.041 20.2443 60.2623 19.581 61.942 18.254C56.3547 16.2585 52.9746 10.3231 54.2624 4.45887C50.6982 5.74265 48.3579 9.48316 49.1532 13.5796ZM55.0081 2.18125C49.766 3.22401 46.0987 8.34018 47.1898 13.9608C47.9698 17.9908 51.2798 21.1808 55.3299 21.8308C58.851 22.4018 62.0953 21.1315 64.266 18.8294C64.2763 18.8185 64.2864 18.8077 64.2966 18.7968C64.4383 18.6452 64.5755 18.4891 64.7077 18.3288C64.7103 18.3257 64.7128 18.3226 64.7154 18.3194C64.8851 18.1133 65.0467 17.9002 65.1999 17.6808C65.4099 17.3708 65.2399 16.9308 64.8699 16.8908C64.5112 16.8503 64.16 16.7916 63.8168 16.7159C63.7962 16.7113 63.7756 16.7067 63.755 16.702C63.6674 16.6821 63.5802 16.661 63.4936 16.6388C63.4917 16.6383 63.4899 16.6379 63.488 16.6374C58.0232 15.2354 54.7249 9.45077 56.454 4.00488C56.4547 4.00285 56.4553 4.00083 56.456 3.99881C56.4873 3.90025 56.5203 3.8018 56.555 3.70349C56.5563 3.69982 56.5576 3.69614 56.5589 3.69246C56.6766 3.35992 56.8134 3.029 56.9699 2.70076C57.1299 2.36076 56.8499 1.98076 56.4699 2.00076C56.1952 2.0145 55.9238 2.03919 55.6559 2.07439C55.6515 2.07498 55.647 2.07557 55.6426 2.07616C55.4411 2.10292 55.2416 2.13563 55.0444 2.17411C55.0323 2.17647 55.0202 2.17885 55.0081 2.18125Z" fill="white" />
                                        <line x1="34.5" y1="3" x2="34.5" y2="21" stroke="white" />
                                    </svg>
                                </Link>
                                <button className="navbar-toggler menu-btn nav-trigger ms-auto">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0)">
                                            <path d="M23.25 7.50002H0.750044C0.336027 7.50002 6.29425e-05 7.164 6.29425e-05 6.75004C6.29425e-05 6.33603 0.336088 6.00006 0.750044 6.00006H23.25C23.664 6.00006 24 6.33609 24 6.75004C24 7.164 23.664 7.50002 23.25 7.50002Z" fill="white" />
                                            <path d="M0.750044 11.2501H23.25C23.664 11.2501 24 11.5861 24 12C24 12.414 23.664 12.75 23.25 12.75H0.750044C0.336027 12.75 6.29425e-05 12.414 6.29425e-05 12C6.29425e-05 11.5861 0.336027 11.2501 0.750044 11.2501Z" fill="white" />
                                            <path d="M0.750034 16.5H15.75C16.164 16.5 16.5 16.836 16.5 17.25C16.5 17.664 16.164 18 15.75 18H0.750034C0.336018 18 5.34058e-05 17.6639 5.34058e-05 17.25C-9.53674e-06 16.836 0.336018 16.5 0.750034 16.5Z" fill="white" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0">
                                                <rect width="24" height="24" fill="white" transform="matrix(-1 0 0 1 24 0)" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </button>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Navbar;