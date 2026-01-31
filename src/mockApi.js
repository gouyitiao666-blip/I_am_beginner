const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const simulateNetwork = async () => {
  await delay(600 + Math.random() * 700);
  if (Math.random() < 0.08) {
    throw new Error("Network error. Please try again.");
  }
};

export const loginWithProvider = async (provider) => {
  await simulateNetwork();
  return {
    user: {
      name: "Jordan Lee",
      email: "jordan.lee@scholar.org",
      provider,
    },
  };
};

export const loginWithStudentAccount = async ({ email, password, sso }) => {
  await simulateNetwork();
  if (!email || (!password && !sso)) {
    throw new Error("Enter your email and password or continue with SSO.");
  }
  if (!email.includes("@")) {
    throw new Error("Enter a valid email address.");
  }
  if (!sso && password.length < 6) {
    throw new Error("Password must be at least 6 characters.");
  }
  return {
    user: {
      name: "Jordan Lee",
      email,
      provider: sso ? "School SSO" : "Student Account",
    },
  };
};

export const requestMagicLink = async (email) => {
  await simulateNetwork();
  if (!email || !email.includes("@")) {
    throw new Error("Enter a valid email address to send the magic link.");
  }
  return { status: "sent" };
};

export const autosaveApplication = async (payload) => {
  await simulateNetwork();
  return {
    status: "saved",
    updatedAt: new Date().toISOString(),
    payload,
  };
};

export const submitApplication = async (payload) => {
  await simulateNetwork();
  return {
    status: "submitted",
    confirmation: `APP-${Math.floor(100000 + Math.random() * 900000)}`,
    payload,
  };
};
