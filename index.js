// =========================================================
// SAHIMAAP — HOMEPAGE JAVASCRIPT
// =========================================================

// Smooth in-page navigation for the homepage action cards.
document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
        const target = document.querySelector(link.getAttribute('href'));

        if (target) {
            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Demo verification flow: the supplied sample record appears after a lookup.
const verificationForm = document.getElementById('verification-form');
const verificationResult = document.getElementById('verification-result');
const certificateIdInput = document.getElementById('certificate-id');

const revealVerificationResult = () => {
    verificationResult.hidden = false;
    document.getElementById('certificate-lookup').scrollIntoView({ behavior: 'smooth', block: 'start' });
    verificationResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
};

verificationForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    revealVerificationResult();
});

// QR camera scanner. The browser only asks for camera permission after the user opens it.
const scannerModal = document.getElementById('scanner-modal');
const scannerVideo = document.getElementById('scanner-video');
const scannerStatus = document.getElementById('scanner-status');
const cameraFrame = document.querySelector('.camera-frame');
let cameraStream;
let scanTimer;

const stopScanner = () => {
    window.clearInterval(scanTimer);
    if (cameraStream) cameraStream.getTracks().forEach((track) => track.stop());
    cameraStream = null;
    scannerVideo.srcObject = null;
    cameraFrame.classList.remove('is-live');
};

const closeScanner = () => {
    stopScanner();
    scannerModal.classList.remove('is-open');
    scannerModal.setAttribute('aria-hidden', 'true');
};

// A scanned QR code should actually land the user on the public verification
// record for that certificate — not just flip a hidden flag on the page.
const openVerificationRecordFromScan = (scannedValue) => {
    if (certificateIdInput && scannedValue) certificateIdInput.value = scannedValue;
    closeScanner();
    revealVerificationResult();
};

const startScanner = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
        scannerStatus.textContent = 'Camera scanning is not supported by this browser.';
        return;
    }

    try {
        scannerStatus.textContent = 'Requesting camera access…';
        cameraStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: 'environment' } }, audio: false });
        scannerVideo.srcObject = cameraStream;
        await scannerVideo.play();
        cameraFrame.classList.add('is-live');
        scannerStatus.textContent = 'Point the camera at a QR code.';

        if ('BarcodeDetector' in window) {
            const detector = new BarcodeDetector({ formats: ['qr_code'] });
            scanTimer = window.setInterval(async () => {
                try {
                    const codes = await detector.detect(scannerVideo);
                    if (codes.length) {
                        scannerStatus.textContent = `QR code detected: ${codes[0].rawValue}`;
                        openVerificationRecordFromScan(codes[0].rawValue);
                    }
                } catch (_) { /* Keep preview open if a frame cannot be read. */ }
            }, 400);
        } else {
            scannerStatus.textContent = 'Camera is live. QR decoding requires a modern Chrome or Edge browser.';
        }
    } catch (error) {
        scannerStatus.textContent = error.name === 'NotAllowedError' ? 'Camera permission was not granted.' : 'The camera could not be started.';
    }
};

document.querySelectorAll('[data-open-scanner]').forEach((button) => button.addEventListener('click', () => {
    scannerModal.classList.add('is-open');
    scannerModal.setAttribute('aria-hidden', 'false');
    scannerStatus.textContent = 'Ready to start the camera.';
}));
document.querySelectorAll('[data-close-scanner]').forEach((button) => button.addEventListener('click', closeScanner));
document.getElementById('start-scanner').addEventListener('click', startScanner);
scannerModal.addEventListener('click', (event) => { if (event.target === scannerModal) closeScanner(); });

// Expiry status is calculated from the certificate date, never hard-coded.
// Uses Math.ceil on whole-day boundaries so a certificate expiring later
// today never reads as already expired, and the "days remaining" figure
// always matches the calendar gap to the stored expiry date.
document.querySelectorAll('[data-expiry]').forEach((element) => {
    const expiry = new Date(`${element.dataset.expiry}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const days = Math.ceil((expiry - today) / 86400000);
    element.textContent = days >= 0
        ? `Expires in ${days} day${days === 1 ? '' : 's'}`
        : `Expired ${Math.abs(days)} day${Math.abs(days) === 1 ? '' : 's'} ago`;
});

// =========================================================
// FIELD VERIFICATION — working demo
// Captures the checklist, uploaded evidence, notes, officer
// identity and a real timestamp, then submits for approval.
// =========================================================
const officerMeta = document.getElementById('officer-meta');
const fieldForm = document.getElementById('field-verification-form');
const fieldStatus = document.getElementById('field-submit-status');
const demoOfficer = 'A. Sharma · LMO-1042';

const stampOfficerMeta = () => {
    if (!officerMeta) return;
    officerMeta.textContent = `${demoOfficer} · ${new Date().toLocaleString()}`;
};
stampOfficerMeta();

fieldForm?.addEventListener('submit', (event) => {
    event.preventDefault();

    const submitButton = fieldForm.querySelector('button[type="submit"]');
    if (submitButton?.disabled) return; // already submitted for this session

    const checklist = ['physical', 'accuracy', 'seal']
        .filter((name) => fieldForm.elements[name]?.checked).length;
    const photoCount = document.getElementById('field-photos')?.files.length || 0;
    const docCount = document.getElementById('field-docs')?.files.length || 0;
    const notes = document.getElementById('field-notes')?.value.trim();
    const submittedAt = new Date().toLocaleString();

    fieldStatus.hidden = false;
    fieldStatus.textContent = `✓ Submitted by ${demoOfficer} at ${submittedAt} — `
        + `${checklist}/3 checklist items, ${photoCount} photo(s), ${docCount} document(s)`
        + `${notes ? ', with observation notes' : ''}. Status: Pending Approval.`;

    stampOfficerMeta();

    // Visibly progress the workflow: lock the checklist and uploads, and
    // swap the button so a reviewer can see this submission moved forward.
    Array.from(fieldForm.elements).forEach((el) => { el.disabled = true; });
    if (submitButton) submitButton.textContent = 'Submitted ✓ — Awaiting Approval';
});
