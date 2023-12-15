import React from "react";
import Link from "next/link";
import { WfLogo } from "./Logos";
import styles from '../../../page.module.css'

const Navbar = () => {
    return (
        <>
            <div className={styles.navbar}>
                <Link
                    className={styles.navcard}
                    href="/warframe/med-calculation" >
                    <WfLogo />
                </Link>
            </div>
        </>
    );
};

export default Navbar;