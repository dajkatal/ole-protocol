'use client'
import * as React from "react";
import { HStack, Button } from "@chakra-ui/react";  // Import Button
import { useRouter } from 'next/navigation';
import siteConfig from "src/landingpage/data/config";
import { NavLink } from "src/landingpage/components/nav-link";
import { useScrollSpy } from "src/landingpage/hooks/use-scrollspy";
import { MobileNavButton } from "src/landingpage/components/mobile-nav";
import { MobileNavContent } from "src/landingpage/components/mobile-nav";
import { useDisclosure, useUpdateEffect } from "@chakra-ui/react";

// @ts-ignore
import { useOCAuth } from '@opencampus/ocid-connect-js';  // Import useOCAuth

const Navigation: React.FC = () => {
    const mobileNav = useDisclosure();
    const router = useRouter();
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
    const { ocAuth } = useOCAuth();

    const handleLogin = async () => {
        try {
            await ocAuth.signInWithRedirect({ state: 'opencampus' });
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <HStack spacing="2" flexShrink={0}>
            {siteConfig.header.links.map(({ href, id, label, variant, ...props }, i) => {
                // Check if the current button is "Connect with OCID"
                if (label === 'Connect with OCID') {
                    return (
                        <Button
                            key={i}
                            variant={variant}
                            onClick={handleLogin}  // Assign the login function to the onClick
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
                                (href && !!router.asPath.match(new RegExp(href)))
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
