"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircleIcon, PencilIcon, TrashIcon } from 'lucide-react'

type Permission = "Read" | "Write" | "Delete"

type Role = {
  id: number
  name: string
  permissions: Permission[]
}

const initialRoles: Role[] = [
  { id: 1, name: "Admin", permissions: ["Read", "Write", "Delete"] },
  { id: 2, name: "Editor", permissions: ["Read", "Write"] },
  { id: 3, name: "Viewer", permissions: ["Read"] },
]

export function RoleManagement() {
  const [roles, setRoles] = useState<Role[]>(initialRoles)
  const [newRole, setNewRole] = useState<Partial<Role>>({ permissions: [] })
  const [editingRole, setEditingRole] = useState<Role | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const addRole = () => {
    if (newRole.name) {
      setRoles([...roles, { ...newRole, id: roles.length + 1, permissions: newRole.permissions || [] } as Role])
      setNewRole({ permissions: [] })
      setIsAddDialogOpen(false)
    }
  }

  const updateRole = () => {
    if (editingRole) {
      setRoles(roles.map(role => role.id === editingRole.id ? editingRole : role))
      setEditingRole(null)
      setIsEditDialogOpen(false)
    }
  }

  const deleteRole = (id: number) => {
    setRoles(roles.filter(role => role.id !== id))
  }

  const togglePermission = (roleId: number, permission: Permission) => {
    setRoles(roles.map(role => {
      if (role.id === roleId) {
        const update
= role.permissions.includes(permission)
          ? role.permissions.filter(p => p !== permission)
          : [...role.permissions, permission]
        return { ...role, permissions: update }
      }
      return role
    }))
  }

  const filteredRoles = roles.filter(role => 
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl">Role Management</CardTitle>
        <CardDescription className="text-sm sm:text-base">Manage roles and their permissions.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
          <Input
            placeholder="Search roles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:max-w-sm"
          />
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto"><PlusCircleIcon className="mr-2 h-4 w-4" /> Add Role</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Role</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={newRole.name || ""}
                    onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Permissions</Label>
                  <div className="col-span-3 space-y-2">
                    {["Read", "Write", "Delete"].map((permission) => (
                      <div key={permission} className="flex items-center space-x-2">
                        <Checkbox
                          id={`permission-${permission}`}
                          checked={newRole.permissions?.includes(permission as Permission)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setNewRole({ ...newRole, permissions: [...(newRole.permissions || []), permission as Permission] })
                            } else {
                              setNewRole({ ...newRole, permissions: newRole.permissions?.filter(p => p !== permission) })
                            }
                          }}
                        />
                        <Label htmlFor={`permission-${permission}`}>{permission}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={addRole}>Add Role</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Name</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRoles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell className="font-medium">{role.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-2">
                      {["Read", "Write", "Delete"].map((permission) => (
                        <Checkbox
                          key={permission}
                          id={`role-${role.id}-permission-${permission}`}
                          checked={role.permissions.includes(permission as Permission)}
                          onCheckedChange={() => togglePermission(role.id, permission as Permission)}
                          className="mr-2"
                        />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingRole(role)
                          setIsEditDialogOpen(true)
                        }}
                      >
                        <PencilIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteRole(role.id)}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Role</DialogTitle>
            </DialogHeader>
            {editingRole && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="edit-name"
                    value={editingRole.name}
                    onChange={(e) => setEditingRole({ ...editingRole, name: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Permissions</Label>
                  <div className="col-span-3 space-y-2">
                    {["Read", "Write", "Delete"].map((permission) => (
                      <div key={permission} className="flex items-center space-x-2">
                        <Checkbox
                          id={`edit-permission-${permission}`}
                          checked={editingRole.permissions.includes(permission as Permission)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setEditingRole({ ...editingRole, permissions: [...editingRole.permissions, permission as Permission] })
                            } else {
                              setEditingRole({ ...editingRole, permissions: editingRole.permissions.filter(p => p !== permission) })
                            }
                          }}
                        />
                        <Label htmlFor={`edit-permission-${permission}`}>{permission}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button onClick={updateRole}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}

