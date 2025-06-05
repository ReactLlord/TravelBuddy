// supabaseClient.js
import { createClient } from '@supabase/supabase-js'
 

const supabaseUrl = "https://okgmfbpqgubqyfqpgmyo.supabase.co"
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rZ21mYnBxZ3VicXlmcXBnbXlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5NDkwMTIsImV4cCI6MjA2NDUyNTAxMn0.p4vqKCyckDwl0-szxQ_Xsf3OOqegxae11_8kVbCMhpw'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
