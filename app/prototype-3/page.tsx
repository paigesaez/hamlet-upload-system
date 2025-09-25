'use client';

import { Card, CardBody, CardHeader } from '@nextui-org/react';

export default function Prototype3Page() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="flex flex-col gap-2 p-6">
          <h1 className="text-3xl font-bold">Prototype 3: Coming Soon</h1>
          <p className="text-gray-600">Third file upload workflow prototype</p>
        </CardHeader>
        <CardBody className="p-6">
          <div className="text-center py-12">
            <p className="text-lg text-gray-500">
              This prototype is under development.
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Use the navigation above to switch between prototypes.
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}