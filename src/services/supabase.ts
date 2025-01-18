import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hypijuucusopsqmswwlj.supabase.co';
const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5cGlqdXVjdXNvcHNxbXN3d2xqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcyMjEyODIsImV4cCI6MjA1Mjc5NzI4Mn0.uKdlRVRx9anbu2tGyQS_OQAN-ipPAK_CtSwZQSR5qZ8';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
