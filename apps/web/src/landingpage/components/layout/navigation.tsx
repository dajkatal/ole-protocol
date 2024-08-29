'use client'
import * as React from "react";
import { HStack, Button } from "@chakra-ui/react";  // Import Button
import { usePathname } from 'next/navigation'; // Import usePathname
import siteConfig from "src/landingpage/data/config";
import { NavLink } from "src/landingpage/components/nav-link";
import { useScrollSpy } from "src/landingpage/hooks/use-scrollspy";
import { MobileNavButton } from "src/landingpage/components/mobile-nav";
import { MobileNavContent } from "src/landingpage/components/mobile-nav";
import { useDisclosure, useUpdateEffect } from "@chakra-ui/react";

// @ts-ignore
import {useAuth} from "@app/features/common/hooks/use-auth";  // Import useOCAuth

const Navigation: React.FC = () => {
    const mobileNav = useDisclosure();
    const pathname = usePathname(); // Use usePathname to get current path
    const activeId = useScrollSpy(
        siteConfig.header.links
            .filter(({ id }) => id)
            .map(({ id }) => `[id="${id}"]`),
        {
            threshold: 0.75,
        }
    );

    const mobileNavBtnRef = React.useRef<HTMLButtonElement>();

    useUpdateEffect(() => {
        mobileNavBtnRef.current?.focus();
    }, [mobileNav.isOpen]);

    // Use OC Auth hook
    const { logIn, ocAuth } = useAuth();


    return (
        <HStack spacing="2" flexShrink={0}>
            {siteConfig.header.links.map(({ href, id, label, variant, ...props }, i) => {
                // Check if the current button is "Connect with OCID"
                if (label === 'Connect with OCID') {
                    return (
                        <Button
                            key={i}
                            variant={variant}
                            onClick={logIn}  // Assign the login function to the onClick
                        >
                            {label}
                        </Button>
                    );
                }

                return (
                    <NavLink
                        display={["none", null, "block"]}
                        href={href || `/#${id}`}
                        key={i}
                        isActive={
                            !!(
                                (id && activeId === id) ||
                                (href && !!pathname.match(new RegExp(href)))
                            )
                        }
                        {...props}
                    >
                        {label}
                    </NavLink>
                );
            })}

            {/* <ThemeToggle /> */}

            <MobileNavButton
                ref={mobileNavBtnRef}
                aria-label="Open Menu"
                onClick={mobileNav.onOpen}
            />

            <MobileNavContent isOpen={mobileNav.isOpen} onClose={mobileNav.onClose} />
        </HStack>
    );
};

export default Navigation;
