# "Neural Cosmos" Deployment & Configuration Guide

This document outlines the step-by-step instructions to effortlessly deploy the portfolio to either **Vercel** or **Netlify**, followed by instructions on how to hook up an active Email service to the Contact form using **EmailJS**.

---

## 🚀 Part 1: Deployment

### Step 0: Preparing and Pushing Your Code to GitHub

Before deploying, your code needs to live in a Git repository like GitHub. Your project already comes with a `.gitignore` file that prevents heavy, non-essential folders (like `node_modules` and `.next`) from being uploaded. 

Run the following commands in your terminal inside the `personal-website` folder:

```bash
# 1. Initialize a new local Git repository (if you haven't already)
git init

# 2. Add all your files. The pre-configured .gitignore automatically skips node_modules!
git add .

# 3. Commit your changes with a message
git commit -m "Initial commit: Neural Cosmos Portfolio"

# 4. Create a new empty repository on GitHub in your browser, then link it using the URL they provide:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git

# 5. Push your code to the main branch
git branch -M main
git push -u origin main
```
Once your code is successfully uploaded to GitHub without the `node_modules`, you can proceed to connect it to a hosting platform.

---

### Option A: Deploying to Vercel (Recommended for Next.js)

Since Next.js is maintained by Vercel, deploying here guarantees "zero-configuration" optimization.

1. **Commit your code to GitHub/GitLab:** Make sure your entire project is pushed to a Git repository. 
2. **Access Vercel Console:** Sign up/Login to [Vercel](https://vercel.com).
3. **Import Project:** Click the **"Add New..."** button and select **Project**.
4. **Connect Git Provider:** Give Vercel access to the Git repository containing this portfolio.
5. **Configure Build:**
   - Framework Preset: Vercel will auto-detect **Next.js**.
   - Root Directory: Leave as `./`.
   - Build Command: `npm run build` (Should auto-populate).
   - Output Directory: `.next` (Should auto-populate).
6. **Environment Variables:** *(You will add your EmailJS keys here later. See Part 2)*.
7. **Deploy:** Click **Deploy**. Vercel will install dependencies and immediately serve your site on a free `.vercel.app` domain. You can map a custom domain in the project settings later.
> *Note: By default, React Three Fiber and Framer Motion are incredibly heavy. Vercel automatically caches and compresses the JS chunks, resulting in flawless performance seamlessly.*

### Option B: Deploying to Netlify

1. **Upload to Git:** Ensure the repository is available on GitHub.
2. **Access Netlify:** Login to [Netlify](https://www.netlify.com/).
3. **Add new site:** Select **"Import from Git"**.
4. **Authorize & Select Repo:** Authorize GitHub and select the `personal-website` repository.
5. **Configure Build:**
   - Base Directory: *(Leave empty)*.
   - Build Command: `next build`
   - Publish directory: `.next`
6. **Plugin Configuration (Important):** Ensure that the `Next.js Runtime` plugin is enabled (Netlify usually installs this automatically upon detecting Next.js, which maps SSR functions uniquely).
7. **Deploy Site:** Click the deploy button to get a live URL.

---

## ✉️ Part 2: EmailJS Configuration (Contact Form)

Currently, the `ContactSection.tsx` simulates sending the form after 2 seconds. Follow these steps to hook it up to a real email delivery system so you receive messages directly to your inbox.

### Step 1: Set up EmailJS
1. Sign up for a free account at [EmailJS](https://www.emailjs.com/).
2. **Add an Email Service:** Add your personal email (e.g., Gmail) in the dashboard. Note down your **Service ID**.
3. **Create an Email Template:** 
   - Create a template defining what the email will look like when you receive it.
   - Use dynamic variables based on your form. For example: `{{name}}`, `{{email}}`, and `{{message}}`.
   - Note down your **Template ID**.
4. **Fetch your Public Key:** Found globally in your EmailJS Account settings.

### Step 2: Install Dependency
Open a terminal in your project directory and install the EmailJS Browser SDK:
```bash
npm install @emailjs/browser
```

### Step 3: Implement in `ContactSection.tsx`
Open `src/components/sections/ContactSection.tsx` and integrate the SDK.

**1. Import EmailJS:**
```tsx
import emailjs from '@emailjs/browser';
```

**2. Update the `handleSubmit` function:**
Replace the simulated `setTimeout` submission block with actual `emailjs.sendForm` logic. Note: You must add a `ref` to your `<form>` element if you don't already have one.

```tsx
export default function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (formRef.current) {
      emailjs.sendForm(
        'YOUR_SERVICE_ID',     // Replace with your EmailJS Service ID
        'YOUR_TEMPLATE_ID',    // Replace with your EmailJS Template ID
        formRef.current,
        'YOUR_PUBLIC_KEY'      // Replace with your EmailJS Public Key
      )
      .then((result) => {
          console.log(result.text);
          alert("Sequence transmitted! Thank you for reaching out.");
          setFormState({ name: '', email: '', message: '' });
          setIsSubmitting(false);
      }, (error) => {
          console.log(error.text);
          alert("Transmission failed. Please try again or reach out manually.");
          setIsSubmitting(false);
      });
    }
  };

  // ... rest of the code
  return (
    // ...
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6">
       {/* Ensure your inputs have names mapping to your template */}
       <input name="name" ... />
       <input name="email" ... />
       <textarea name="message" ... />
    </form>
  )
}
```

### 🔒 Environment Variable Safety for Next.js

It is best practice to secure your keys. In the root of your project, create a `.env.local` file:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

Then map them inside `emailjs.sendForm`:
```tsx
emailjs.sendForm(
  process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
  process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
  formRef.current,
  process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
)
```

**Final Note:** Don't forget to input your Vercel or Netlify project environment variables reflecting these exact `.env.local` keys when you deploy!
