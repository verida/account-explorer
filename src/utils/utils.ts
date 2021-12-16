// @todo: update function that validate blockchain address

export const validateDid = (did: string): boolean => {
    const paths = did.split(":");

    if (paths[0] !== "did") {
        return false;
    }

    if (paths[1] !== "vda") {
        return false;
    }

    if (paths[2].length !== 42) {
        return false;
    }

    return true;
};
