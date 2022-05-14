import React from 'react'
import { FiSettings } from 'react-icons/fi';
import { CgProfile } from 'react-icons/cg';
import { MdPayment } from 'react-icons/md';

export const SidebarData = [
    {
        title: "General",
        link: "/general",
        icon: <FiSettings />
    },
    {
        title: "Profile",
        link: "/profile",
        icon: <CgProfile />
    },
    {
        title: "Payment",
        link: "/payment",
        icon: <MdPayment />
    }
]