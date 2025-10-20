-- Add missing RLS policies to user_roles table to prevent privilege escalation

-- Only admins can INSERT new role assignments
CREATE POLICY "Only admins can assign roles"
ON public.user_roles 
FOR INSERT 
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- Only admins can UPDATE existing role assignments
CREATE POLICY "Only admins can update roles"
ON public.user_roles 
FOR UPDATE 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- Only admins can DELETE role assignments
CREATE POLICY "Only admins can delete roles"
ON public.user_roles 
FOR DELETE 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));