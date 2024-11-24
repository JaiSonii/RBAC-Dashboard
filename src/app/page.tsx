'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserManagement } from "@/components/user-management"
import { RoleManagement } from "@/components/role-management"
import { PermissionManagement } from "@/components/permission-management"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Provider } from 'react-redux'
import { store } from '@/lib/store'

export default function Dashboard() {
  const { theme, setTheme } = useTheme()
  return (

    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">RBAC Dashboard</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </header>
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl sm:text-3xl font-bold">Welcome to RBAC Dashboard</CardTitle>
            <CardDescription className="text-sm sm:text-base">Manage users, roles, and permissions for your organization</CardDescription>
          </CardHeader>
        </Card>
        <Provider store={store}>
          <Tabs defaultValue="users" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="roles">Roles</TabsTrigger>
              <TabsTrigger value="permissions">Permissions</TabsTrigger>
            </TabsList>
            <TabsContent value="users">
              <UserManagement />
            </TabsContent>
            <TabsContent value="roles">
              <RoleManagement />
            </TabsContent>
            <TabsContent value="permissions">
              <PermissionManagement />
            </TabsContent>
          </Tabs>
        </Provider>
      </main>
    </div>

  )
}
