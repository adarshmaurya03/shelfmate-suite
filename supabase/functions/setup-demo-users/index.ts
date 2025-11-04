import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    // Check if users already exist
    const { data: existingProfiles } = await supabaseAdmin
      .from('profiles')
      .select('username')
      .in('username', ['adm', 'user'])
    
    if (existingProfiles && existingProfiles.length > 0) {
      return new Response(
        JSON.stringify({ message: 'Demo users already exist' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Create admin user
    const { data: adminUser, error: adminError } = await supabaseAdmin.auth.admin.createUser({
      email: 'adm@library.local',
      password: 'adm',
      email_confirm: true,
    })

    if (adminError) throw adminError

    // Create regular user
    const { data: regularUser, error: userError } = await supabaseAdmin.auth.admin.createUser({
      email: 'user@library.local',
      password: 'user',
      email_confirm: true,
    })

    if (userError) throw userError

    // Create profiles
    await supabaseAdmin.from('profiles').insert([
      {
        id: adminUser.user.id,
        name: 'Administrator',
        username: 'adm',
        is_active: true,
      },
      {
        id: regularUser.user.id,
        name: 'Regular User',
        username: 'user',
        is_active: true,
      },
    ])

    // Assign roles
    await supabaseAdmin.from('user_roles').insert([
      {
        user_id: adminUser.user.id,
        role: 'admin',
      },
      {
        user_id: regularUser.user.id,
        role: 'user',
      },
    ])

    return new Response(
      JSON.stringify({ 
        message: 'Demo users created successfully',
        users: [
          { username: 'adm', password: 'adm', role: 'admin' },
          { username: 'user', password: 'user', role: 'user' }
        ]
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
