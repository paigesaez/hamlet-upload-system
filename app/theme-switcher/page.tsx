'use client';

import { useState, useEffect } from 'react';
import { Button, Card, CardBody, CardHeader, Select, SelectItem } from '@nextui-org/react';

const themes = [
  { key: 'light', label: '☀️ Light - Clean and bright' },
  { key: 'dark', label: '🌙 Dark - Night mode' },
  { key: 'purple', label: '💜 Purple - Modern and vibrant' },
  { key: 'ocean', label: '🌊 Ocean - Cool and calm' },
  { key: 'forest', label: '🌲 Forest - Natural green' },
  { key: 'sunset', label: '🌅 Sunset - Warm orange' },
];

export default function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState('light');

  useEffect(() => {
    // Remove all theme classes
    themes.forEach(theme => {
      document.documentElement.classList.remove(theme.key);
    });
    // Add current theme class
    document.documentElement.classList.add(currentTheme);
  }, [currentTheme]);

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Card>
          <CardHeader>
            <h1 className="text-3xl font-bold">HeroUI Theme Switcher</h1>
          </CardHeader>
          <CardBody className="space-y-6">
            <div className="flex items-center gap-4">
              <Select
                label="Choose Theme"
                placeholder="Select a theme"
                selectedKeys={[currentTheme]}
                onSelectionChange={(keys) => {
                  const selected = Array.from(keys)[0] as string;
                  setCurrentTheme(selected);
                }}
                className="max-w-xs"
              >
                {themes.map((theme) => (
                  <SelectItem key={theme.key}>
                    {theme.label}
                  </SelectItem>
                ))}
              </Select>

              <div className="flex gap-2">
                {themes.map((theme) => (
                  <Button
                    key={theme.key}
                    size="sm"
                    variant={currentTheme === theme.key ? 'solid' : 'bordered'}
                    color="primary"
                    onPress={() => setCurrentTheme(theme.key)}
                  >
                    {theme.label.split(' ')[0]}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardBody>
                  <h3 className="text-lg font-semibold mb-2">Primary Colors</h3>
                  <div className="flex gap-2">
                    <Button color="primary" variant="solid">Solid</Button>
                    <Button color="primary" variant="bordered">Bordered</Button>
                    <Button color="primary" variant="flat">Flat</Button>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <h3 className="text-lg font-semibold mb-2">Secondary Colors</h3>
                  <div className="flex gap-2">
                    <Button color="secondary" variant="solid">Solid</Button>
                    <Button color="secondary" variant="bordered">Bordered</Button>
                    <Button color="secondary" variant="flat">Flat</Button>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <h3 className="text-lg font-semibold mb-2">Success Colors</h3>
                  <div className="flex gap-2">
                    <Button color="success" variant="solid">Solid</Button>
                    <Button color="success" variant="bordered">Bordered</Button>
                    <Button color="success" variant="flat">Flat</Button>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <h3 className="text-lg font-semibold mb-2">Danger Colors</h3>
                  <div className="flex gap-2">
                    <Button color="danger" variant="solid">Solid</Button>
                    <Button color="danger" variant="bordered">Bordered</Button>
                    <Button color="danger" variant="flat">Flat</Button>
                  </div>
                </CardBody>
              </Card>
            </div>

            <Card className="bg-content1">
              <CardBody>
                <h3 className="text-xl font-semibold mb-4">Theme Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-default-500">Background</p>
                    <div className="w-full h-10 bg-background border rounded mt-1"></div>
                  </div>
                  <div>
                    <p className="text-sm text-default-500">Foreground</p>
                    <div className="w-full h-10 bg-foreground border rounded mt-1"></div>
                  </div>
                  <div>
                    <p className="text-sm text-default-500">Content 1</p>
                    <div className="w-full h-10 bg-content1 border rounded mt-1"></div>
                  </div>
                  <div>
                    <p className="text-sm text-default-500">Content 2</p>
                    <div className="w-full h-10 bg-content2 border rounded mt-1"></div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}