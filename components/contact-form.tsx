"use client"

import { useState, useTransition } from "react"
import { motion } from "framer-motion"
import { sendEmail } from "@/app/actions/sendEmail"

export default function ContactForm() {
  const [isPending, startTransition] = useTransition()
  const [result, setResult] = useState<{ success?: string; error?: string } | null>(null)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    }

    setResult(null) // Reset previous results

    startTransition(async () => {
      const response = await sendEmail(data)
      setResult(response)
      if (response.success) {
        form.reset()
        // Optional: Clear success message after a few seconds
        setTimeout(() => {
          setResult(null)
        }, 5000)
      }
    })
  }

  const isSubmittedSuccessfully = result?.success && !isPending;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-8 transition-all duration-300"
    >
      {/* Name Input */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-4 py-3 bg-card border border-border/50 rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
          placeholder="Your name"
          disabled={isPending}
        />
      </div>

      {/* Email Input */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-4 py-3 bg-card border border-border/50 rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
          placeholder="your@email.com"
          disabled={isPending}
        />
      </div>

      {/* Message Input */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full px-4 py-3 bg-card border border-border/50 rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
          placeholder="Tell me about your project..."
          disabled={isPending}
        />
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={Boolean(isPending || isSubmittedSuccessfully)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmittedSuccessfully ? (
          <>
            <motion.svg
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </motion.svg>
            Message Sent!
          </>
        ) : isPending ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
            />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </motion.button>

      {/* Result Message */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 border rounded-lg text-center ${
            result.error
              ? "bg-red-500/20 border-red-500/50 text-red-500"
              : "bg-primary/20 border-primary/50 text-primary"
          }`}
        >
          {result.success || result.error}
        </motion.div>
      )}
    </form>
  )
}