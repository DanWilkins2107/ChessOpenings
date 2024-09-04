export default async function pause(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
